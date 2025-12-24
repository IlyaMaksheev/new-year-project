import uuid
from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import FileResponse

from images.exceptions import ImageNotFound
from images.utils import get_image_by_uuid
from database.models import Images, UserImage
from database.session import SessionLocal


images_router = APIRouter(prefix="/api/images", tags=["Images"])


@images_router.get("/cards/{image_uuid}/")
async def get_card_image(
    image_uuid: uuid.UUID,
) -> FileResponse:
    db = SessionLocal()
    try:
        image_data = get_image_by_uuid(image_uuid, db, Images)
        image_path_obj = Path(image_data.path)
    finally:
        db.close()

    if not image_path_obj.exists():
        raise ImageNotFound(image_uuid)

    return FileResponse(image_path_obj)


@images_router.get("/users/{image_uuid}/")
async def get_user_image(
    image_uuid: uuid.UUID,
) -> FileResponse:
    db = SessionLocal()
    try:
        image_data = get_image_by_uuid(image_uuid, db, UserImage)
        image_path_obj = Path(image_data.path)
    finally:
        db.close()

    if not image_path_obj.exists():
        raise ImageNotFound(image_uuid)

    return FileResponse(image_path_obj)
