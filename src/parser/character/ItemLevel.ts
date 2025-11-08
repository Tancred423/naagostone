function addLeadingZeros(num: number, length: number) {
  const numString = num.toString();
  if (numString.length >= length) return numString;
  else return "0".repeat(length - numString.length) + numString;
}

export class ItemLevel {
  static getAverageItemLevel(parsed: Record<string, unknown>): string {
    let sum = 0;
    const character = parsed.character as Record<
      string,
      Record<string, unknown>
    >;

    if (!character) {
      return "000";
    }

    sum += (character.mainhand?.item_level as number) ?? 0;
    sum += (character.offhand?.item_level as number) ??
      (character.mainhand?.item_level as number) ??
      0;
    sum += (character.head?.item_level as number) ?? 0;
    sum += (character.body?.item_level as number) ?? 0;
    sum += (character.hands?.item_level as number) ?? 0;
    sum += (character.legs?.item_level as number) ?? 0;
    sum += (character.feet?.item_level as number) ?? 0;
    sum += (character.earrings?.item_level as number) ?? 0;
    sum += (character.necklace?.item_level as number) ?? 0;
    sum += (character.bracelets?.item_level as number) ?? 0;
    sum += (character.ring1?.item_level as number) ?? 0;
    sum += (character.ring2?.item_level as number) ?? 0;

    if (character.mainhand?.item_level) {
      character.mainhand.item_level = addLeadingZeros(
        character.mainhand.item_level as number,
        3,
      );
    }

    if (character.offhand?.item_level) {
      character.offhand.item_level = addLeadingZeros(
        character.offhand.item_level as number,
        3,
      );
    }

    if (character.head?.item_level) {
      character.head.item_level = addLeadingZeros(
        character.head.item_level as number,
        3,
      );
    }

    if (character.body?.item_level) {
      character.body.item_level = addLeadingZeros(
        character.body.item_level as number,
        3,
      );
    }

    if (character.hands?.item_level) {
      character.hands.item_level = addLeadingZeros(
        character.hands.item_level as number,
        3,
      );
    }

    if (character.legs?.item_level) {
      character.legs.item_level = addLeadingZeros(
        character.legs.item_level as number,
        3,
      );
    }

    if (character.feet?.item_level) {
      character.feet.item_level = addLeadingZeros(
        character.feet.item_level as number,
        3,
      );
    }

    if (character.earrings?.item_level) {
      character.earrings.item_level = addLeadingZeros(
        character.earrings.item_level as number,
        3,
      );
    }

    if (character.necklace?.item_level) {
      character.necklace.item_level = addLeadingZeros(
        character.necklace.item_level as number,
        3,
      );
    }

    if (character.bracelets?.item_level) {
      character.bracelets.item_level = addLeadingZeros(
        character.bracelets.item_level as number,
        3,
      );
    }

    if (character.ring1?.item_level) {
      character.ring1.item_level = addLeadingZeros(
        character.ring1.item_level as number,
        3,
      );
    }

    if (character.ring2?.item_level) {
      character.ring2.item_level = addLeadingZeros(
        character.ring2.item_level as number,
        3,
      );
    }

    return addLeadingZeros(Math.floor(sum / 12), 3);
  }
}
