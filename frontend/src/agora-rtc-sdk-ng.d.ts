declare namespace AgoraRTC {
    type Client = any; // Replace 'any' with the actual type if available
    interface IMicrophoneAudioTrack {
      setEnabled(arg0: boolean): unknown;
}
    interface ICameraVideoTrack {
      play(arg0: string): unknown;
}
    interface IRemoteUser {
      audioTrack: any;
      videoTrack: any;
      uid: any;
}
    interface AudioVolumeInfo {
      level: any;
      uid: any;
}
  }
  