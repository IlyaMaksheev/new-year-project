import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, DragEvent } from "react";
import { useCreateCard } from "./useCreateCard";
import type { CardDataFieldType } from "../types/card";

export type UseImagePickerConfig = {
  accept?: string; // MIME accept pattern, defaults to image/*
  maxSizeMb?: number; // optional file size guard
  onPreviewChange?: (url: string | undefined) => void; // observe preview changes
};

export type UseImagePickerReturn = {
  preview?: string;
  isDragging: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleImageFile: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  handlePasteImage: (e: ClipboardEvent<HTMLDivElement>) => void;
  clearPreview: () => void;
};

/**
 * Consolidated image picking logic (click-to-select, drag-n-drop, paste from clipboard)
 * for card fields. Used by Nomination and Suggestion components.
 */
export const useImagePicker = (
  index: number,
  sectionKey: CardDataFieldType,
  config: UseImagePickerConfig = {},
): UseImagePickerReturn => {
  const { addImageToCard } = useCreateCard();
  const { accept = "image/*", maxSizeMb = 10, onPreviewChange } = config;

  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastObjectUrlRef = useRef<string | undefined>(undefined);

  const revoke = (url?: string) => {
    if (url) {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    }
  };

  useEffect(() => {
    // cleanup on unmount
    return () => revoke(lastObjectUrlRef.current);
  }, []);

  useEffect(() => {
    onPreviewChange?.(preview);
  }, [preview, onPreviewChange]);

  const setNewPreview = (url: string | undefined) => {
    if (lastObjectUrlRef.current && lastObjectUrlRef.current !== url) {
      revoke(lastObjectUrlRef.current);
    }
    lastObjectUrlRef.current = url;
    setPreview(url);
  };

  const validateFile = (file?: File | null) => {
    if (!file) return false;
    if (accept.startsWith("image/") && !file.type.startsWith("image/")) return false;
    if (maxSizeMb && file.size > maxSizeMb * 1024 * 1024) return false;
    return true;
  };

  const processFile = (file?: File | null) => {
    if (!validateFile(file)) return;
    const objectUrl = URL.createObjectURL(file as File);
    setNewPreview(objectUrl);
    addImageToCard(index, sectionKey, file as File);
  };

  const handleImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (event.target?.files?.length !== 1) return;
    processFile(file ?? undefined);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handlePasteImage = (e: ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items || items.length === 0) return;

    const imageItem = Array.from(items).find(
      (it) => it.kind === "file" && it.type.startsWith("image/"),
    );
    if (!imageItem) return;

    const blob = imageItem.getAsFile() as File | null;
    if (!blob) return;

    const file =
      blob instanceof File
        ? blob
        : new File([blob], "pasted-image.png", {
            // @ts-ignore
            type: blob?.type || "image/png",
          });

    processFile(file);
    e.preventDefault();
  };

  const clearPreview = () => {
    setNewPreview(undefined);
  };

  return {
    preview,
    isDragging,
    inputRef,
    handleImageFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handlePasteImage,
    clearPreview,
  };
};
