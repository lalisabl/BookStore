import fitz  # PyMuPDF

def extract_thumbnail_from_first_page(pdf_path, output_folder):
    # Open the PDF file
    pdf_document = fitz.open(pdf_path)

    # Get the first page
    first_page = pdf_document[0]

    # Get the Pix object (image) of the first page
    pix = first_page.get_pixmap()

    # Save the Pix object as an image file
    image_path = f"{output_folder}/thumbnail_page_1.png"
    pix.save(image_path, "png")

    # Close the PDF document
    pdf_document.close()

# Example usage

pdf_file_path = "./ashawa tech.pdf"
output_folder_path = "./tr"
# extract_thumbnails(pdf_file_path, output_folder_path)
extract_thumbnail_from_first_page(pdf_file_path, output_folder_path)
