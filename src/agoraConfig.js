import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "5107d3c5dc27486789ccad7b5cc63adf";
const token = "0065107d3c5dc27486789ccad7b5cc63adfIABWBp5nXNmWh2NoxcQnULz9o7XVf6RKkyNs2RYYWhoAgtkcGOEAAAAAEACOCs8ZvH6bYQEAAQC8fpth"

export const config = { mode: 'rtc', codec: 'vp8', appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "video-chat"