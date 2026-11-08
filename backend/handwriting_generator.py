from PIL import Image, ImageDraw, ImageFont
import numpy as np
import os


def generate_handwriting(text, font_size=90, font_path=None):

    try:
        if not text or text.strip() == "":
            return None

        font_size = int(font_size)

        # A4 size
        width = 1240
        height = 1754

        paper = np.ones((height, width, 3), dtype=np.uint8) * 255
        img = Image.fromarray(paper)
        draw = ImageDraw.Draw(img)

        # 🔥 If user font not provided, use default
        if not font_path:
            font_path = os.path.join(os.path.dirname(__file__), "handwriting.ttf")

        if not os.path.exists(font_path):
            print("Font file not found!")
            return None

        font = ImageFont.truetype(font_path, font_size)

        margin_left = 120
        margin_top = 150
        margin_right = 120

        max_text_width = width - margin_left - margin_right
        line_height = font_size + 40

        words = text.split()
        lines = []
        current_line = ""

        for word in words:
            test_line = current_line + word + " "
            test_width = draw.textlength(test_line, font=font)

            if test_width <= max_text_width:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word + " "

        if current_line:
            lines.append(current_line)

        y = margin_top

        for line in lines:
            draw.text((margin_left, y), line.strip(), font=font, fill=(0, 0, 0))
            y += line_height

            if y > height - 150:
                break

        output_path = os.path.join(os.path.dirname(__file__), "output.png")
        img.save(output_path)

        return output_path

    except Exception as e:
        print("Handwriting Generation Error:", str(e))
        return None