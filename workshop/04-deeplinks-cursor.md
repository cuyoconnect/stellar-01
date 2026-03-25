# Deeplinks de Cursor

## Documentación oficial

- [cursor.com/docs/integrations/deeplinks](https://cursor.com/docs/integrations/deeplinks)

## Límite técnico

Los deeplinks de Cursor tienen un **máximo de 8000 caracteres por URL** (según la documentación).

## Comportamiento por entorno

Al elegir el entorno en el selector:

- **Cursor** abre el deeplink.
- **Claude Code** intenta el handler de VS Code.
- **VS Code**, **Codex** y **Antigravity** copian el texto al portapapeles si el enlace no aplica en ese entorno.

En el workshop, los deeplinks se usan para instalar comandos y skills en un clic; los payloads solo de identidad visual o generación de imágenes no están incluidos en estos apuntes.
