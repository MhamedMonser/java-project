export interface Video {
    url: string;
    videoUrl: string;
    id: number;
    videoName: string;
    isAccept: boolean;

    videoData: Uint8Array;
    
    // Add other properties you need for your video model
    // For example, you might want to include a title, description, date, etc.
  }
  