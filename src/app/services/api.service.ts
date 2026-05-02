import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Specific method for contact form
  submitContactForm(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contacts`, payload);
  }

  // Get videos for films page
  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/videos`);
  }

  // Add new video
  addVideo(videoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/videos`, videoData);
  }

  // Update existing video
  updateVideo(id: number, videoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/videos/${id}`, videoData);
  }

  // Delete video
  deleteVideo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/videos/${id}`);
  }

  // Get images for gallery page
  getImages(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/images`);
  }

  // Get contact inquiries for admin page
  getContacts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contacts`);
  }

  // Add new image (multipart/form-data)
  addImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/images`, formData);
  }

  // Update existing image (multipart/form-data)
  updateImage(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/images/${id}`, formData);
  }

  // Delete image
  deleteImage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/images/${id}`);
  }

  // Feedback Management
  getAllFeedback(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/feedback/all`);
  }

  sendFeedbackRequest(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/feedback/send`, payload);
  }

  updateFeedbackStatus(id: number, isActive: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/feedback/status/${id}`, { isActive });
  }

  // Public Feedback Submission
  getFeedbackStatus(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/feedback/status/${token}`);
  }

  submitFeedback(token: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/feedback/submit/${token}`, formData);
  }

  // Helper to get base API URL (e.g., http://localhost:8080) for uploads
  getAssetUrl(path: string): string {
    const baseUrl = this.apiUrl.replace('/api', '');
    return `${baseUrl}${path}`;
  }
}
