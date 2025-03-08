
import { toast } from "@/components/ui/use-toast";

// Google Drive API credentials
const CLIENT_ID = "551176477836-7ggose37nkbdm8rdr2qf1becbskqeb1d.apps.googleusercontent.com";
const API_KEY = "AIzaSyBaYEwmLyZ7a2zvAMnAOw5tU04dlkb3mBo"; // Updated API Key
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/drive.file";

let gApiInitialized = false;

/**
 * Initialize the Google API client
 */
export const initGoogleDriveApi = (): Promise<void> => {
  if (gApiInitialized) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            gApiInitialized = true;
            resolve();
          })
          .catch((error: any) => {
            console.error("Error initializing Google API:", error);
            reject(error);
          });
      });
    };

    script.onerror = (error) => {
      console.error("Error loading Google API script:", error);
      reject(error);
    };

    document.body.appendChild(script);
  });
};

/**
 * Check if user is authenticated with Google
 */
export const isGoogleAuthenticated = (): boolean => {
  if (!gApiInitialized || !window.gapi.auth2) return false;
  return window.gapi.auth2.getAuthInstance().isSignedIn.get();
};

/**
 * Authenticate user with Google
 */
export const authenticateWithGoogle = async (): Promise<void> => {
  try {
    await initGoogleDriveApi();
    if (!isGoogleAuthenticated()) {
      await window.gapi.auth2.getAuthInstance().signIn();
      console.log("Google authentication successful");
    }
  } catch (error) {
    console.error("Google authentication failed:", error);
    toast({
      title: "Authentication Failed",
      description: "Could not authenticate with Google Drive.",
      variant: "destructive",
    });
    throw error;
  }
};

/**
 * Upload file to Google Drive
 */
export const uploadFileToGoogleDrive = async (file: File): Promise<string> => {
  try {
    console.log("Starting Google Drive upload process...");
    await authenticateWithGoogle();
    console.log("Authentication complete, preparing file upload...");
    
    const metadata = {
      name: file.name,
      mimeType: file.type,
    };
    
    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);
    
    const accessToken = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().access_token;
    
    console.log("Sending file to Google Drive API...");
    const response = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: form,
      }
    );
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Drive API Error:", errorData);
      throw new Error(`File upload to Google Drive failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Upload successful, file ID:", data.id);
    
    // Make the file publicly accessible via link
    const shareResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files/${data.id}/permissions`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "reader",
          type: "anyone",
        }),
      }
    );
    
    if (!shareResponse.ok) {
      console.warn("Could not make file publicly accessible, but upload succeeded");
    } else {
      console.log("File is now publicly accessible");
    }
    
    return `https://drive.google.com/file/d/${data.id}/view`;
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    toast({
      title: "Upload Failed",
      description: "Could not upload file to Google Drive.",
      variant: "destructive",
    });
    throw error;
  }
};

/**
 * Delete file from Google Drive by URL
 */
export const deleteFileFromGoogleDrive = async (fileUrl: string): Promise<void> => {
  try {
    await authenticateWithGoogle();
    
    // Extract file ID from the URL
    const matches = fileUrl.match(/\/d\/(.+?)\/view/);
    if (!matches || !matches[1]) {
      throw new Error("Invalid Google Drive URL");
    }
    
    const fileId = matches[1];
    const accessToken = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().access_token;
    
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error("File deletion from Google Drive failed");
    }
  } catch (error) {
    console.error("Error deleting from Google Drive:", error);
    toast({
      title: "Deletion Failed",
      description: "Could not delete file from Google Drive.",
      variant: "destructive",
    });
    throw error;
  }
};
