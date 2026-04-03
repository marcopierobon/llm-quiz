#!/usr/bin/env python3
"""
Main script to process YouTube subtitle files and extract content for quiz generation.
"""

import os
from utils import process_vtt_files, extract_key_topics

def main():
    """Main function to process YouTube subtitles."""
    # Directory containing the VTT files
    subtitle_directory = "/Users/marcopierobon/CascadeProjects/windsurf-project-4"
    
    print("Processing YouTube subtitle files...")
    print("=" * 60)
    
    # Process all VTT files and get cleaned content
    processed_content = process_vtt_files(subtitle_directory)
    
    print(f"\nProcessed {len(processed_content)} subtitle files successfully!")
    print("=" * 60)
    
    # Display summary of processed content
    for video_title, content in processed_content.items():
        print(f"\nVideo: {video_title}")
        print(f"Content length: {len(content)} characters")
        print(f"Content preview: {content[:200]}...")
        
        # Extract key topics
        topics = extract_key_topics(content)
        print(f"Key topics: {', '.join(topics)}")
        print("-" * 40)
    
    # Save processed content to a file for further use
    output_file = os.path.join(subtitle_directory, "processed_subtitles.txt")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("PROCESSED YOUTUBE SUBTITLE CONTENT\n")
        f.write("=" * 60 + "\n\n")
        
        for video_title, content in processed_content.items():
            f.write(f"VIDEO: {video_title}\n")
            f.write("-" * 40 + "\n")
            f.write(content)
            f.write("\n\n" + "=" * 60 + "\n\n")
    
    print(f"\nProcessed content saved to: {output_file}")
    print("Ready for quiz generation!")

if __name__ == "__main__":
    main()
