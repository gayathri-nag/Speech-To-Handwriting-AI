from reportlab.platypus import SimpleDocTemplate, Image
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib import utils

def create_pdf(image_path, output_path):
    try:
        doc = SimpleDocTemplate(output_path, pagesize=A4)
        elements = []

        img = utils.ImageReader(image_path)
        img_width, img_height = img.getSize()

        max_width = 6 * inch
        max_height = 9 * inch

        ratio = min(max_width / img_width, max_height / img_height)

        final_width = img_width * ratio
        final_height = img_height * ratio

        image = Image(image_path, width=final_width, height=final_height)
        elements.append(image)

        doc.build(elements)

        return output_path

    except Exception as e:
        print("PDF Error:", str(e))
        return None