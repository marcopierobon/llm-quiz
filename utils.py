import re
import os
from typing import List, Dict

def clean_vtt_content(vtt_content: str) -> str:
    """Clean VTT content by removing timestamps, metadata, and formatting."""
    lines = vtt_content.split('\n')
    cleaned_lines = []
    last_line = ""
    
    for line in lines:
        # Skip empty lines
        if not line.strip():
            continue
            
        # Skip VTT metadata and timestamps
        if line.startswith('WEBVTT') or line.startswith('NOTE') or '-->' in line:
            continue
            
        # Skip lines that are just numbers (cue identifiers)
        if line.strip().isdigit():
            continue
            
        # Remove HTML tags and clean the text
        cleaned_line = re.sub(r'<[^>]+>', '', line.strip())
        
        # Skip if the line is empty after cleaning
        if not cleaned_line:
            continue
            
        # Avoid duplicate consecutive lines (common in auto-generated subtitles)
        if cleaned_line != last_line:
            cleaned_lines.append(cleaned_line)
            last_line = cleaned_line
    
    return ' '.join(cleaned_lines)

def process_vtt_files(directory_path: str) -> Dict[str, str]:
    """Process all VTT files in a directory and return cleaned content."""
    vtt_files = [f for f in os.listdir(directory_path) if f.endswith('.vtt')]
    processed_content = {}
    
    for vtt_file in vtt_files:
        file_path = os.path.join(directory_path, vtt_file)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                vtt_content = f.read()
            
            cleaned_content = clean_vtt_content(vtt_content)
            
            # Extract video title from filename (remove .en.vtt extension)
            video_title = vtt_file.replace('.en.vtt', '')
            processed_content[video_title] = cleaned_content
            
            print(f"Processed: {video_title}")
            print(f"Original length: {len(vtt_content)} characters")
            print(f"Cleaned length: {len(cleaned_content)} characters")
            print("-" * 50)
            
        except Exception as e:
            print(f"Error processing {vtt_file}: {e}")
    
    return processed_content

def extract_key_topics(content: str, max_topics: int = 10) -> List[str]:
    """Extract key topics from cleaned subtitle content using simple keyword extraction."""
    # Simple keyword extraction - can be enhanced with NLP techniques
    words = content.lower().split()
    
    # Filter out common English stop words
    stop_words = {
        'the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'as', 'are', 'was', 'were',
        'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
        'should', 'may', 'might', 'must', 'can', 'shall', 'to', 'of', 'in', 'for', 'with',
        'by', 'from', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
        'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'i',
        'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they', 'them', 'their',
        'this', 'that', 'these', 'those', 'what', 'which', 'who', 'when', 'where', 'why', 'how',
        'all', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
        'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'now'
    }
    
    # Filter words and count frequency
    filtered_words = [word for word in words if word.isalpha() and len(word) > 3 and word not in stop_words]
    word_freq = {}
    
    for word in filtered_words:
        word_freq[word] = word_freq.get(word, 0) + 1
    
    # Sort by frequency and return top topics
    sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
    return [word for word, freq in sorted_words[:max_topics]]
