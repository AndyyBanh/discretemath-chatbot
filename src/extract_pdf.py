import pdfplumber
import os

# Constants
# List of PDFs to convert
PDF_PATH = [
    "../data/Chapter 1 part 1.pdf",
    "../data/Chapter 1 Proofs.pdf",
    "../data/Chapter 2 Functions.pdf",
    "../data/Chapter3 Algorithms.pdf",
    "../data/Chapter 5 Induction and Recursion.pdf",
    "../data/Chapter8 Advanced Counting Techniques.pdf",
    "../data/Chapter 9 Relations.pdf",
    "../data/Chapter10 Graphs.pdf",
    "../data/Chapter 11 Trees.pdf"
    ]
# Path for markdown file to create
OUTPUT_PATH = "../data/DiscreteMathText.md"

def extract_pdf_to_md(pdf_paths, output_path):
    # String to hold all markdown text
    md_text = ""

    # iterate through list of paths and check that each file exists
    for pdf_path in pdf_paths:
        if not os.path.exists(pdf_path):
            print(f"File not found: {pdf_path}")
            continue

        # Open each pdf in array
        with pdfplumber.open(pdf_path) as pdf:
            # iterate through keeping track of page numbers and page content
            for page_num, page in enumerate(pdf.pages, start=1):
                text = page.extract_text() 
                if not text:
                    print(f"No text on this page {page_num} in {pdf_path}")
                    continue

                # Split string whenever there is newline character
                lines = text.split('\n')
                if not lines:
                    continue

                # create first line of page text into a markdown heading
                md_text += f"# {lines[0].strip()}\n\n"

                # temp array to store paragraph sentences
                paragraph_lines = []
                # iterate through everyline after first line
                for line in lines[1:]:
                    clean_line = line.replace('', '-').strip()

                    # check if line is empty meaning paragraph has ended add point to md text and reset for next paragraph
                    if clean_line == '':
                        if paragraph_lines:
                            md_text += ''.join(paragraph_lines) + "\n\n"
                            paragraph_lines = []
                    elif clean_line.startswith('-'): # check if line starts with bullet point if so finish paragraph and then add bullet point directly to md_text
                        if paragraph_lines:
                            md_text += ''.join(paragraph_lines) + "\n\n"
                            paragraph_lines = []
                        md_text += clean_line + "\n"
                    else:
                        paragraph_lines.append(clean_line)

                if paragraph_lines:
                    md_text += ''.join(paragraph_lines) + "\n\n"

                # slide separator
                md_text += "---\n\n"

            # Add section divider between different PDFs
            md_text += "\n\n## End of {}\n\n".format(os.path.basename(pdf_path))
            md_text += "===================================\n\n"

    # Write everything onto one file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(md_text)
    print(f"Markdown saved to {output_path}")

        
if __name__ == "__main__":
    extract_pdf_to_md(PDF_PATH, OUTPUT_PATH)
