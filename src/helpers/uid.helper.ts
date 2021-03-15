export class UidHelper {
  // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
  private static lastPushTime = 0;

  // Modeled after base64 web-safe chars, but ordered by ASCII.
  private static PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  // We generate 72-bits of randomness which get turned into 12 characters and appended to the
  // timestamp to prevent collisions with other clients.  We store the last characters we
  // generated because in the event of a collision, we'll use those same characters except
  // 'incremented' by one.
  private static lastRandChars = [];

  // Generates chronologically ordered unique string one by one
  public static generate() {
    let now = new Date().getTime();
    const duplicateTime = now === UidHelper.lastPushTime;
    UidHelper.lastPushTime = now;

    const timeStampChars = new Array(8);
    for (let i = 7; i >= 0; i--) {
      timeStampChars[i] = UidHelper.PUSH_CHARS.charAt(now % 64);
      // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
      now = Math.floor(now / 64);
    }
    if (now !== 0) {
      throw new Error('We should have converted the entire timestamp.');
    }

    let id = timeStampChars.join('');

    if (!duplicateTime) {
      for (let i = 0; i < 12; i++) {
        UidHelper.lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
      let i = 11;
      for (i; i >= 0 && UidHelper.lastRandChars[i] === 63; i--) {
        UidHelper.lastRandChars[i] = 0;
      }
      UidHelper.lastRandChars[i]++;
    }
    for (let i = 0; i < 12; i++) {
      id += UidHelper.PUSH_CHARS.charAt(UidHelper.lastRandChars[i]);
    }
    if (id.length !== 20) {
      throw new Error('Length should be 20.');
    }

    return id;
  }
}
