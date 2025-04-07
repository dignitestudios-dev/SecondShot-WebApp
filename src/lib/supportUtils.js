export const generateCombinedPDF = async (
    userData,
    elementId,
    filename = "profile-report.pdf",
    subscriptionpaid
  ) => {
    try {
      // Validate inputs
      if (!userData) {
        console.error("Cannot generate PDF: User data is missing");
        return null;
      }
  
      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`Element with ID '${elementId}' not found`);
        return null;
      }
  
      // STEP 1: Capture the HTML element first
      // Temporarily hide elements with the class 'pdf-exclude'
      const excludeElements = document.querySelectorAll(".pdf-exclude");
      excludeElements.forEach((el) => (el.style.display = "none"));
  
      try {
        // Set padding to prevent left/right cutting
        const padding = 50;
  
        // Capture element with higher scale for better quality
        const canvas = await html2canvas(element, {
          scale: 2,
          backgroundColor: "#ffffff",
        });
  
        // Create a new padded canvas
        const paddedCanvas = document.createElement("canvas");
        const ctx = paddedCanvas.getContext("2d");
  
        paddedCanvas.width = canvas.width + 2 * padding;
        paddedCanvas.height = canvas.height + 2 * padding;
  
        // Fill background with white
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
  
        // Draw original canvas in center with padding
        ctx.drawImage(canvas, padding, padding);
  
        // STEP 2: Create PDF document
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 297; // A4 height in mm
  
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: [pdfWidth, pdfHeight],
        });
  
        // STEP 3: Add the snapshot to the first page
        const contentWidth = pdfWidth - 20; // Keep some margin
        const contentHeight =
          (paddedCanvas.height * contentWidth) / paddedCanvas.width;
  
        // Add snapshot image to first page
        pdf.addImage(
          paddedCanvas.toDataURL("image/jpeg", 0.7),
          "JPEG",
          10, // x position
          10, // y position
          contentWidth,
          contentHeight
        );
  
        // STEP 4: Generate and add structured data on subsequent pages
        pdf.addPage(); // Add new page for structured data
        addStructuredContent(pdf, userData, subscriptionpaid); // Add the structured data
  
        // STEP 5: Return the PDF blob
        return pdf.output('blob');
      } finally {
        // Restore visibility of hidden elements
        document
          .querySelectorAll(".pdf-exclude")
          .forEach((el) => (el.style.display = ""));
      }
    } catch (error) {
      console.error("Error generating combined PDF:", error);
      return null;
    }
  };