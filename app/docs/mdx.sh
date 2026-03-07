#!/bin/bash

TARGET_DIR="./mdx"
mkdir -p "$TARGET_DIR"

URLS=(
  "https://base-ui.com/react/components/accordion.md"
  "https://base-ui.com/react/components/alert-dialog.md"
  "https://base-ui.com/react/components/autocomplete.md"
  "https://base-ui.com/react/components/avatar.md"
  "https://base-ui.com/react/components/button.md"
  "https://base-ui.com/react/components/checkbox.md"
  "https://base-ui.com/react/components/checkbox-group.md"
  "https://base-ui.com/react/components/collapsible.md"
  "https://base-ui.com/react/components/combobox.md"
  "https://base-ui.com/react/components/context-menu.md"
  "https://base-ui.com/react/components/dialog.md"
  "https://base-ui.com/react/components/drawer.md"
  "https://base-ui.com/react/components/field.md"
  "https://base-ui.com/react/components/fieldset.md"
  "https://base-ui.com/react/components/form.md"
  "https://base-ui.com/react/components/input.md"
  "https://base-ui.com/react/components/menu.md"
  "https://base-ui.com/react/components/menubar.md"
  "https://base-ui.com/react/components/meter.md"
  "https://base-ui.com/react/components/navigation-menu.md"
  "https://base-ui.com/react/components/number-field.md"
  "https://base-ui.com/react/components/popover.md"
  "https://base-ui.com/react/components/preview-card.md"
  "https://base-ui.com/react/components/progress.md"
  "https://base-ui.com/react/components/radio.md"
  "https://base-ui.com/react/components/scroll-area.md"
  "https://base-ui.com/react/components/select.md"
  "https://base-ui.com/react/components/separator.md"
  "https://base-ui.com/react/components/slider.md"
  "https://base-ui.com/react/components/switch.md"
  "https://base-ui.com/react/components/tabs.md"
  "https://base-ui.com/react/components/toast.md"
  "https://base-ui.com/react/components/toggle.md"
  "https://base-ui.com/react/components/toggle-group.md"
  "https://base-ui.com/react/components/toolbar.md"
  "https://base-ui.com/react/components/tooltip.md"
)

for url in "${URLS[@]}"; do
  # Extraer nombre y capitalizar la primera letra compatible con cualquier bash
  filename=$(basename "$url" .md)
  capitalized_name="$(tr '[:lower:]' '[:upper:]' <<< ${filename:0:1})${filename:1}"
  local_file="$TARGET_DIR/${capitalized_name}.mdx"
  
  echo "Procesando: $local_file"
  
  # 1. Descargar el contenido de la URL
  raw_download=$(curl -sL "$url")
  
  # FILTRO DE SEGURIDAD: Comprobar si el link devolvió código HTML
  if [[ "$raw_download" == *"<html"* ]] || [[ "$raw_download" == *"<!DOCTYPE"* ]]; then
      echo "  [ERROR] El link $url devolvió una página web HTML, no código Markdown."
      echo "          Asegúrate de que el link apunta a un archivo RAW."
      continue
  fi

  # 2. Extraer desde la etiqueta remota (ignorando mayúsculas y espacios iniciales)
  remote_content=$(echo "$raw_download" | awk 'tolower($0) ~ /^[ \t]*## api reference/ || tolower($0) ~ /^[ \t]*### root/ || tolower($0) ~ /^[ \t]*### props/ {flag=1} flag')
  
  if [ -n "$remote_content" ]; then
    if [ -f "$local_file" ]; then
      temp_file=$(mktemp)
      
      # 3. Mantener el contenido local ANTES de la primera etiqueta
      awk 'tolower($0) ~ /^[ \t]*## api reference/ || tolower($0) ~ /^[ \t]*### root/ || tolower($0) ~ /^[ \t]*### props/ {exit} {print}' "$local_file" > "$temp_file"
      
      # 4. Inyectar el contenido remoto
      echo "" >> "$temp_file"
      echo "$remote_content" >> "$temp_file"
      
      # 5. Sobrescribir el archivo
      mv "$temp_file" "$local_file"
      echo "  [OK] Contenido reemplazado correctamente."
    else
      echo "$remote_content" > "$local_file"
      echo "  [OK] Archivo creado con el contenido remoto."
    fi
  else
    echo "  [ADVERTENCIA] No se encontró la etiqueta 'API reference', 'Root' o 'Props' en el link descargado."
  fi
done

echo "¡Proceso finalizado!"