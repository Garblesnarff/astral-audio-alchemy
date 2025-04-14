
/**
 * Handles audio recording functionality for remote viewing sessions
 */
export class RemoteViewingRecorder {
  private isRecording: boolean = false;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordingStream: MediaStream | null = null;
  
  /**
   * Start audio recording
   */
  startRecording(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!navigator.mediaDevices) {
        reject(new Error('Media devices not supported in this browser'));
        return;
      }
      
      if (this.isRecording) {
        reject(new Error('Already recording'));
        return;
      }
      
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.recordingStream = stream;
          this.mediaRecorder = new MediaRecorder(stream);
          this.audioChunks = [];
          
          this.mediaRecorder.addEventListener('dataavailable', (event) => {
            this.audioChunks.push(event.data);
          });
          
          this.mediaRecorder.start();
          this.isRecording = true;
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  
  /**
   * Stop audio recording
   */
  stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.isRecording || !this.mediaRecorder) {
        resolve(null);
        return;
      }
      
      this.mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.isRecording = false;
        
        // Clean up
        if (this.recordingStream) {
          this.recordingStream.getTracks().forEach(track => track.stop());
          this.recordingStream = null;
        }
        
        resolve(audioBlob);
      });
      
      this.mediaRecorder.stop();
    });
  }
  
  /**
   * Check if currently recording
   */
  getIsRecording(): boolean {
    return this.isRecording;
  }
}
