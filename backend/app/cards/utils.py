from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound

from cards.exceptions import (
    CardTemplateNotFound,
    CardNotFound,
    CardDataNotFound,
    CardDataTypeNotFound,
)
from cards.schemas import (CardDataTypes, CreateNominationData, CreateSuggestionData)
from database.models import Templates, Cards


def get_card_template_by_id(
    template_id: int,
    db: Session,
) -> Templates:
    try:
        return db.query(Templates).filter(Templates.id == template_id).one()
    except NoResultFound:
        raise CardTemplateNotFound(template_id)


def get_card_by_id(
    card_id: int,
    db: Session,
) -> Cards:
    try:
        return db.query(Cards).filter(Cards.id == card_id).one()
    except NoResultFound:
        raise CardNotFound(card_id)


def get_card_data_by_id(
    card_id: int,
    data_id: int,
    card_data_type: CardDataTypes,
    db: Session,
) -> tuple[Cards, dict[str, str]]:
    card = get_card_by_id(card_id, db)

    try:
        return card, [
            item for item in card.data[card_data_type.name] if item["id"] == data_id
        ][0]
    except KeyError:
        raise CardDataTypeNotFound(card_id, card_data_type)
    except IndexError:
        raise CardDataNotFound(card_id, data_id, card_data_type)


def update_nominations(
        old_nominations: list[dict],
        input_nominations: list[CreateNominationData]
) -> list[dict]:
    new_nominations: list[dict] = []

    for index, old_nomination in enumerate(old_nominations):
        base = {"id": index, **old_nomination}
        new_nomination_description = input_nominations[index].description

        if new_nomination_description:
            base['description'] = new_nomination_description

        new_nominations.append(base)

    return new_nominations

def update_suggestions(
        old_suggestions: list[dict],
        input_suggestions: list[CreateSuggestionData]
) -> list[dict]:
    new_suggestions: list[dict] = []

    if input_suggestions is not None:
        for index, sugg in enumerate(input_suggestions):
            base = {"id": index, **sugg.model_dump()}

            if index < len(old_suggestions):
                if old_suggestions[index].get("image_uuid") is not None:
                    base["image_uuid"] = old_suggestions[index].get("image_uuid")
                if old_suggestions[index].get("image_url") is not None:
                    base["image_url"] = old_suggestions[index].get("image_url")
            new_suggestions.append(base)
    else:
        new_suggestions = old_suggestions

    return new_suggestions