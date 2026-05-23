import json

def get_nun_count(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    total_nun_count = 0
    for ayah in data.get('ayahs', []):
        for harf_count_entry in ayah.get('harfCounts', []):
            if harf_count_entry.get('char') == 'ن':
                total_nun_count += harf_count_entry.get('count', 0)
    return total_nun_count

file_path = 'src/data/enhanced-al-qamar.json'
nun_count = get_nun_count(file_path)
print(f"Total count of 'ن' (nun) in Surah Al-Qamar: {nun_count}")
