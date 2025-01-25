'use server';
import { Client as NTPClient } from 'ntp-time';

export async function getCurrentTime() {
  try {
    const ntpClient = new NTPClient();
    const currentTime = await ntpClient.syncTime();
    return { currentTime: currentTime.time };
  } catch (err: unknown) {
    console.log(err);
  }
  return { currentTime: new Date() };
}
