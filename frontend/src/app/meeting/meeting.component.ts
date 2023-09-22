import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AgoraRTC from 'agora-rtc-sdk-ng';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  client: AgoraRTC.Client;
  config = {
    appid: "9eecea53193d472a9c4e6893b68772ff",
    token: null as string | null,
    uid: null as string | null,
    channel: "livestream",
  };



  localTrackState = {
    audioTrackMuted: false,
    videoTrackMuted: false
  };
  localTracks: {
    audioTrack: AgoraRTC.IMicrophoneAudioTrack | null;
    videoTrack: AgoraRTC.ICameraVideoTrack | null;
    [key: string]: any; // Add an index signature for dynamic keys
  } = {
    audioTrack: null,
    videoTrack: null
  };
  
  
  remoteTracks: Record<string, AgoraRTC.IRemoteUser> = {};

  constructor(private router: Router) { this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });}

  ngOnInit() {
    
    this.initializeAgoraClient();
  }

  async initializeAgoraClient() {
    
    // Use Angular event binding if possible
    document.getElementById('join-btn')?.addEventListener('click', async () => {
      const usernameInput = document.getElementById('username') as HTMLInputElement;
      this.config.uid = usernameInput.value;
      await this.joinStreams();
      const joinWrapper = document.getElementById('join-wrapper');
      if (joinWrapper) {
        joinWrapper.style.display = 'none';
      }
      const footer = document.getElementById('footer');
      if (footer) {
        footer.style.display = 'flex';
      }
    });
    

    document.getElementById('mic-btn')?.addEventListener('click', async () => {
      if (!this.localTrackState.audioTrackMuted) {
        if (this.localTracks.audioTrack) {
          await this.localTracks.audioTrack.setEnabled(false);
          this.localTrackState.audioTrackMuted = true;
        }
        const micBtn = document.getElementById('mic-btn');
        if (micBtn) {
          micBtn.style.backgroundColor = 'rgb(255, 80, 80, 0.7)';
        }
      } else {
        if (this.localTracks.audioTrack) {
          await this.localTracks.audioTrack.setEnabled(true);
          this.localTrackState.audioTrackMuted = false;
        }
        const micBtn = document.getElementById('mic-btn');
        if (micBtn) {
          micBtn.style.backgroundColor = '#1f1f1f8e';
        }
      }
    });
    
    

    document.getElementById('camera-btn')?.addEventListener('click', async () => {
      if (!this.localTrackState.videoTrackMuted) {
        await (this.localTracks.videoTrack as any)?.setMuted(true);
        this.localTrackState.videoTrackMuted = true;
        const cameraBtn = document.getElementById('camera-btn');
        if (cameraBtn) {
          cameraBtn.style.backgroundColor = 'rgb(255, 80, 80, 0.7)';
        }
      } else {
        await (this.localTracks.videoTrack as any)?.setMuted(false);
        this.localTrackState.videoTrackMuted = false;
        const cameraBtn = document.getElementById('camera-btn');
        if (cameraBtn) {
          cameraBtn.style.backgroundColor = '#1f1f1f8e';
        }
      }
    });
    

    document.getElementById('leave-btn')?.addEventListener('click', async () => {
      for (const trackName in this.localTracks) {
        const track = this.localTracks[trackName];
        if (track) {

          track.stop();
          track.close();
          this.localTracks[trackName] = null;
        }
      }
    
      await this.client.leave();
      const footer = document.getElementById('footer');
      if (footer) {
        footer.style.display = 'none';
      }
      const userStreams = document.getElementById('user-streams');
      if (userStreams) {
        userStreams.innerHTML = '';
      }
      const joinWrapper = document.getElementById('join-wrapper');
      if (joinWrapper) {
        joinWrapper.style.display = 'block';
      }
      this.router.navigate(['/user-dash']);

    });
    
  

   
  }
  async joinStreams() {
    if (!this.client) {
      console.error('Agora client is not initialized.');
      return;
    }
    this.client.on("user-published", (user: AgoraRTC.IRemoteUser, mediaType: string) => this.handleUserJoined(user, mediaType));
    this.client.on("user-left", (user: { uid: string | number; }) => this.handleUserLeft(user));

    this.client.enableAudioVolumeIndicator();
    this.client.on("volume-indicator", (evt: string | any[]) =>{
      for (let i = 0; i < evt.length; i++) {
        const speaker = evt[i].uid;
        const volume = evt[i].level;
        if (volume > 0) {
          document.getElementById(`volume-${speaker}`)?.setAttribute('src', '../assets/img/volume-on.svg');
        } else {
          document.getElementById(`volume-${speaker}`)?.setAttribute('src', '../assets/img/volume-off.svg');
        }
      }
    });

    [this.config.uid, this.localTracks.audioTrack, this.localTracks.videoTrack] = await Promise.all([
      this.client.join(this.config.appid, this.config.channel, this.config.token || null, this.config.uid || null),
      AgoraRTC.createMicrophoneAudioTrack(),
      AgoraRTC.createCameraVideoTrack()
    ]);
    let player = `
    <div class="video-containers" id="video-wrapper-${this.config.uid}">
      <p class="user-uid"><img class="volume-icon" id="volume-${this.config.uid}" src="./assets/img/volume-on.svg" /> ${this.config.uid}</p>
      <div class="video-player player" id="stream-${this.config.uid}"></div>
    </div>
  `;

  document.getElementById('user-streams')?.insertAdjacentHTML('beforeend', player);
  this.localTracks.videoTrack?.play(`stream-${this.config.uid}`);

  // Publish local video tracks to the entire channel
  await this.client.publish([this.localTracks.audioTrack, this.localTracks.videoTrack]);
  }

  public async handleUserJoined(user: AgoraRTC.IRemoteUser, mediaType: string) {
    console.log('Handle user joined',user)
    this.remoteTracks[user.uid] = user;

    await this.client.subscribe(user, mediaType)
    if (mediaType === 'video') {
      let player = document.getElementById(`video-wrapper-${user.uid}`);
      if (player != null) {
        player.remove();
      }

      const newUserPlayer = `
        <div class="video-containers" id="video-wrapper-${user.uid}">
          <p class="user-uid"><img class="volume-icon" id="volume-${user.uid}" src="../assets/img/volume-on.svg" /> ${user.uid}</p>
          <div class="video-player player" id="stream-${user.uid}"></div>
        </div>
      `;

      document.getElementById('user-streams')?.insertAdjacentHTML('beforeend', newUserPlayer);
      user.videoTrack?.play(`stream-${user.uid}`);
      console.log('User ID:', user.uid);
      console.log('Video Track:', user);
      
      
    }

    if (mediaType === 'audio') {
      user.audioTrack?.play();
    }
  }

  private handleUserLeft(user: { uid: string | number; }) {
    delete this.remoteTracks[user.uid];
    document.getElementById(`video-wrapper-${user.uid}`)?.remove();
  }
}
