package com.example.entity.file.controller;

import com.example.entity.file.service.S3UploadService;
import com.example.entity.global.dto.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class S3Controller {

    private final S3UploadService s3UploadService;

    @PostMapping("/upload")
    public ResponseEntity<CommonResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = s3UploadService.saveFile(file);
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("이미지 업로드 성공")
                    .data(fileUrl)
                    .build(), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(CommonResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("이미지 업로드 실패")
                    .data(false)
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
    }

    @GetMapping("/download")
    public ResponseEntity<UrlResource> downloadFile(@RequestParam("filename") String filename) {
        try {
            UrlResource urlResource = s3UploadService.downloadFile(filename);

            String contentDisposition = "attachment; filename=\"" + filename + "\"";

            // header에 CONTENT_DISPOSITION 설정을 통해 클릭 시 다운로드 진행
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .body(urlResource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<CommonResponse> deleteFile(@RequestParam("filename") String filename) {
        try {
            s3UploadService.deleteImage(filename);
            return new ResponseEntity<>(CommonResponse.builder()
                            .status(HttpStatus.OK.value())
                            .message("이미지 삭제 성공")
                            .data(true)
                            .build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(CommonResponse.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message("이미지 삭제 실패")
                            .data(false)
                            .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
