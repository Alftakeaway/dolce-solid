import re

def patch_default_category():
    file_path = "App.jsx"
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Errore: Il file {file_path} non è stato trovato nella cartella corrente.")
        return

    print("Inizio patch per cambiare la categoria di default da 'all' a 'starters'...")

    # Definiamo la riga originale e quella modificata
    old_category_signal = 'const [selectedCategory, setSelectedCategory] = createSignal("all");'
    new_category_signal = 'const [selectedCategory, setSelectedCategory] = createSignal("starters");'

    if old_category_signal in content:
        content = content.replace(old_category_signal, new_category_signal)
        print("[OK] Categoria di default modificata correttamente in 'starters'.")
    elif new_category_signal in content:
        print("[INFO] La categoria di default è già impostata su 'starters'.")
    else:
        print("[ERRORE] Impossibile trovare la riga del segnale 'selectedCategory' nel file.")
        return

    # Salva le modifiche nel file App.jsx
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("\n[COMPLETATO] Modifica applicata con successo! Ora all'apertura del sito verranno mostrati gli Starters.")

if __name__ == "__main__":
    patch_default_category()