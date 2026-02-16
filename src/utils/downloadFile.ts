/**
 * This function allow you to download any file in project
 * It has two parameters
 * @param fileUrl file url is de the file path
 * @param fileName file name if downloaded
 */
export function downloadFiles(fileUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  link.click();
}
