'use client'

import React, { useState, useCallback } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  loading?: 'lazy' | 'eager'
  fallbackSrc?: string
  maxRetries?: number
}

const DEFAULT_FALLBACK = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="100%25" height="100%25" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%239ca3af"%3EImage not available%3C/text%3E%3C/svg%3E'

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fallbackSrc = DEFAULT_FALLBACK,
  maxRetries = 3,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [retryCount, setRetryCount] = useState(0)
  const [hasError, setHasError] = useState(false)

  const handleError = useCallback(() => {
    if (retryCount < maxRetries && !hasError) {
      // Retry loading the original image
      setRetryCount(prev => prev + 1)
      // Force reload by appending a cache-busting parameter
      setImgSrc(`${src}?retry=${retryCount + 1}&t=${Date.now()}`)
    } else if (!hasError) {
      // After max retries, use fallback
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }, [src, retryCount, maxRetries, hasError, fallbackSrc])

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      onError={handleError}
      className={className}
      style={{
        aspectRatio: `${width} / ${height}`,
      }}
    />
  )
}
