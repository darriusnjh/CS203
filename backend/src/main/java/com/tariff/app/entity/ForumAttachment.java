package com.tariff.app.entity;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "forum_attachments")
public class ForumAttachment {

	@Id
	@GeneratedValue
	@Column(name = "id", columnDefinition = "UUID")
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id", nullable = false)
	private ForumPost post;

	@Column(name = "file_name", nullable = false)
	private String fileName;

	@Column(name = "content_type")
	private String contentType;

	@Column(name = "url", nullable = false)
	private String url;

	@Column(name = "size_bytes")
	private Long sizeBytes;

	@Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMPTZ")
	private OffsetDateTime createdAt;

	@PrePersist
	public void onCreate() { this.createdAt = OffsetDateTime.now(); }

	public UUID getId() { return id; }
	public void setId(UUID id) { this.id = id; }
	public ForumPost getPost() { return post; }
	public void setPost(ForumPost post) { this.post = post; }
	public String getFileName() { return fileName; }
	public void setFileName(String fileName) { this.fileName = fileName; }
	public String getContentType() { return contentType; }
	public void setContentType(String contentType) { this.contentType = contentType; }
	public String getUrl() { return url; }
	public void setUrl(String url) { this.url = url; }
	public Long getSizeBytes() { return sizeBytes; }
	public void setSizeBytes(Long sizeBytes) { this.sizeBytes = sizeBytes; }
}


