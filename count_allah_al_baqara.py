import json
import re

def count_word_allah(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    allah_count = 0
    # The normalized form of "Allah" (الله) without tashkeel
    target_word_normalized = "الله"

    for ayah in data.get('ayahs', []):
        for kalimah_entry in ayah.get('kalimahs', []):
            # Check the normalized form of the word
            if kalimah_entry.get('normalizedKalimah') == target_word_normalized:
                allah_count += 1
    return allah_count

file_path = 'src/data/enhanced-al-baqara.json'
allah_count = count_word_allah(file_path)
print(f"Total count of the word \"Allah\" (الله) in Surah Al-Baqarah: {allah_count}")
