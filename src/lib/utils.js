import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { logo } from "../assets/export";

/**
 * Generates a PDF from user profile data that includes hobbies, subjects, and sports
 * @param {Object} userData - The user data object from the API
 * @returns {jsPDF} - The generated PDF document
 */
export const generateProfilePDF = (userData) => {
  // Null check for userData
  if (!userData) {
    console.error("User data is undefined or null");
    return new jsPDF(); // Return empty PDF
  }

  // Create a new PDF document
  const doc = new jsPDF();

  // Set page margins (in mm)
  const pageWidth = 210; // A4 width
  const leftMargin = 20;
  const rightMargin = 20;
  const maxLineWidth = pageWidth - leftMargin - rightMargin;

  // Set font size and style
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Helper function to wrap text and return new Y position
  const wrapText = (text, x, y, maxWidth, lineHeight) => {
    if (!text) return y;

    // Split the text into words
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth =
        (doc.getStringUnitWidth(testLine) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;

      if (testWidth > maxWidth && i > 0) {
        doc.text(line.trim(), x, currentY);
        line = words[i] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }

    // Print the last line
    if (line.trim() !== "") {
      doc.text(line.trim(), x, currentY);
      currentY += lineHeight;
    }

    return currentY;
  };

  // Helper function to add section title
  const addSectionTitle = (title, y) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title || "Untitled Section", leftMargin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    return y + 8;
  };

  // Helper function to add a numbered list item with subitems
  const addListItem = (number, text, y, subitems = []) => {
    doc.text(`${number}. ${text || "No title"}`, leftMargin, y);
    let currentY = y + 6;

    if (Array.isArray(subitems)) {
      subitems.forEach((item, index) => {
        if (item) {
          const letter = String.fromCharCode(97 + index); // a, b, c, ...
          const description =
            item.description ||
            (typeof item === "string" ? item : "No description available");

          // Initial position for the prefix (a., b., etc)
          doc.text(`    ${letter}.`, leftMargin, currentY);

          // Calculate indent for the wrapped text (prefix width)
          const prefixWidth =
            (doc.getStringUnitWidth(`    ${letter}. `) *
              doc.internal.getFontSize()) /
            doc.internal.scaleFactor;
          const indentedX = leftMargin + prefixWidth;
          const indentedMaxWidth = maxLineWidth - prefixWidth;

          // Position for the start of the description text
          const descStartY = currentY;

          // Wrap and draw the description text with proper indentation
          currentY = wrapText(
            description,
            indentedX,
            descStartY,
            indentedMaxWidth,
            6
          );
        }
      });
    }

    return currentY;
  };

  let yPosition = 20;

  // Add heading at the top center
  yPosition = addSectionTitle(`Hannan`, yPosition);
  // Add Sport section if athlete data exists
  if (
    userData?.is_athlete &&
    userData?.athlete &&
    userData?.athlete?.primary_sport
  ) {
    yPosition = addSectionTitle(
      `Sport: ${userData?.athlete?.primary_sport?.sport_name}`,
      yPosition
    );

    // This is a placeholder - you would normally get topics from userData.athlete
    // For demonstration purposes, adding a generic safety point
    // Extract topics from the hobby data

    // Add Position section if athlete data exists
    if (
      userData.is_athlete &&
      userData.athlete &&
      userData.athlete.sport_position
    ) {
      yPosition = addSectionTitle(
        `Position: ${userData.athlete.sport_position.position_name}`,
        yPosition
      );

      // Extract topics from the hobby data
      const hobbyTopics = userData.athlete.sport_position.topics || [];
      if (Array.isArray(hobbyTopics)) {
        hobbyTopics.forEach((topic, index) => {
          if (topic && index <= hobbyTopics.length - 1) {
            // Limit to first 2 topics to match format in image
            const prevPosition = yPosition;
            yPosition = addListItem(index + 1, topic.title, yPosition, [
              { description: topic.description || "No description available" },
            ]);

            // Check if we need a new page after adding this item
            if (yPosition > 250) {
              doc.addPage();
              yPosition = 20;
            }
          }
        });
      }

      yPosition += 10;
    }
  }

  // Add Position section if athlete data exists
  if (
    userData.is_athlete &&
    userData.military &&
    userData.military.branch_of_service
  ) {
    yPosition = addSectionTitle(
      `Military: ${userData.military.branch_of_service.service_name}`,
      yPosition
    );

    // Add Position section if athlete data exists
    if (userData.is_athlete && userData.military && userData.military.rank) {
      yPosition = addSectionTitle(
        `Position: ${userData.military.rank.rank_name}`,
        yPosition
      );

      // Extract topics from the hobby data
      const hobbyTopics = userData.military.rank.topics || [];
      if (Array.isArray(hobbyTopics)) {
        hobbyTopics.forEach((topic, index) => {
          if (topic && index <= hobbyTopics.length - 1) {
            // Limit to first 2 topics to match format in image
            const prevPosition = yPosition;
            yPosition = addListItem(index + 1, topic.title, yPosition, [
              { description: topic.description || "No description available" },
            ]);

            // Check if we need a new page after adding this item
            if (yPosition > 250) {
              doc.addPage();
              yPosition = 20;
            }
          }
        });
      }

      yPosition += 10;
    }
  }

  // Check if we need to start a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Add Favorite Subject section
  if (userData.favorite_middle_school_subject) {
    const subjectName =
      userData.favorite_middle_school_subject.subject_name || "Unnamed Subject";
    yPosition = addSectionTitle(`Favorite Subject: ${subjectName}`, yPosition);

    // Extract topics from the subject data
    const subjectTopics = userData.favorite_middle_school_subject.topics || [];
    if (Array.isArray(subjectTopics)) {
      subjectTopics.forEach((topic, index) => {
        if (topic) {
          const prevPosition = yPosition;
          yPosition = addListItem(index + 1, topic.title, yPosition, [
            { description: topic.description || "No description available" },
          ]);

          // Check if we need a new page after adding this item
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
        }
      });
    }

    yPosition += 10;
  }

  // Check if we need to start a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Add Hobby 1 section
  if (userData.favorite_hobby1) {
    const hobbyName = userData.favorite_hobby1.hobbie_name || "Unnamed Hobby";
    yPosition = addSectionTitle(`Favorite Hobby: ${hobbyName}`, yPosition);

    // Extract topics from the hobby data
    const hobbyTopics = userData.favorite_hobby1.topics || [];
    if (Array.isArray(hobbyTopics)) {
      hobbyTopics.forEach((topic, index) => {
        if (topic && index <= hobbyTopics.length - 1) {
          // Limit to first 2 topics to match format in image
          const prevPosition = yPosition;
          yPosition = addListItem(index + 1, topic.title, yPosition, [
            { description: topic.description || "No description available" },
          ]);

          // Check if we need a new page after adding this item
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
        }
      });
    }

    yPosition += 10;
  }

  // Check if we need to start a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Add Hobby 2 section
  if (userData.favorite_hobby2) {
    const hobbyName = userData.favorite_hobby2.hobbie_name || "Unnamed Hobby";
    yPosition = addSectionTitle(`Favorite Hobby 2: ${hobbyName}`, yPosition);

    // Extract topics from the hobby data
    const hobbyTopics = userData.favorite_hobby2.topics || [];
    if (Array.isArray(hobbyTopics)) {
      hobbyTopics.forEach((topic, index) => {
        if (topic && index <= hobbyTopics.length - 1) {
          // Limit to first 2 topics to match format in image
          const prevPosition = yPosition;
          yPosition = addListItem(index + 1, topic.title, yPosition, [
            { description: topic.description || "No description available" },
          ]);

          // Check if we need a new page after adding this item
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
        }
      });
    }
  }

  // Add End of document marker on the last page
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "End of document",
    pageWidth - rightMargin,
    280,
    null,
    null,
    "right"
  );

  return doc;
};

/**
 * Function to download the user profile data as a PDF
 * @param {Object} userData - The user data object from the API
 */
export const downloadProfilePDF = (userData) => {
  try {
    if (!userData) {
      console.error("Cannot generate PDF: User data is missing");
      return;
    }
    const doc = generateProfilePDF(userData);
    doc.save("profile-report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

/**
 * Combined function to generate a PDF with a snapshot of an HTML element on the first page
 * and structured user data on subsequent pages
 *
 * @param {Object} userData - The user profile data
 * @param {string} elementId - The ID of the HTML element to capture
 * @param {string} filename - The name for the downloaded PDF file
 */
// 🧠 Helper: Convert image URL → Base64 (so jsPDF won’t throw CORS error)
async function loadImageAsBase64(url) {
  try {
    const res = await fetch(logo, { mode: "cors" });
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("Logo fetch failed:", err);
    return null;
  }
}

export const generateCombinedPDF = async (
  userData,
  elementId,
  filename = "profile-report.pdf",
  subscriptionpaid,
  profilename,
  setIsSnapshot
) => {
  setIsSnapshot(true);
  try {
    if (!userData) {
      console.error("Cannot generate PDF: User data is missing");
      return;
    }

    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID '${elementId}' not found`);
      return;
    }

    // 🔹 Hide elements not for PDF
    const excludeElements = document.querySelectorAll(".pdf-exclude");
    excludeElements.forEach((el) => (el.style.display = "none"));

    // 🔹 Wait for all images to load
    const images = element.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (!img.complete) {
          return new Promise((resolve) => (img.onload = img.onerror = resolve));
        }
      })
    );

    // 🔹 Temporarily disable transitions globally
    const style = document.createElement("style");
    style.innerHTML = `
      * { transition: none !important; animation: none !important; }
    `;
    document.head.appendChild(style);

    // 🔹 Temporarily bring hidden element to front
    const prevZIndex = element.style.zIndex;
    const prevOpacity = element.style.opacity;
    const prevVisibility = element.style.visibility;
    const prevPosition = element.style.position;

    element.style.zIndex = "9999";
    element.style.opacity = "1";
    element.style.visibility = "visible";
    element.style.position = "relative";

    await new Promise((resolve) => setTimeout(resolve, 400));

    // ✅ Disable transitions/effects on this element
    const downloadEl = document.getElementById(elementId);
    if (downloadEl) {
      downloadEl.style.transition = "none";
      downloadEl.style.opacity = "1";
      downloadEl.style.background = "#ffffff";
      downloadEl.querySelectorAll("*").forEach((el) => {
        el.style.transition = "none";
        el.style.opacity = "1";
        el.style.filter = "none";
      });
    }

    // 🔹 Capture element
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    // Restore styles
    document.head.removeChild(style);
    element.style.zIndex = prevZIndex;
    element.style.opacity = prevOpacity;
    element.style.visibility = prevVisibility;
    element.style.position = prevPosition;

    // 🔹 Add padding around canvas
    const padding = 50;
    const paddedCanvas = document.createElement("canvas");
    const ctx = paddedCanvas.getContext("2d");
    paddedCanvas.width = canvas.width + 2 * padding;
    paddedCanvas.height = canvas.height + 2 * padding;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
    ctx.drawImage(canvas, padding, padding);

    // 🔹 Create PDF
    const pdfWidth = 210;
    const pdfHeight = 297;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });

    // ✅ Load logo safely
    const logoBase64 = await loadImageAsBase64(
      "https://secondshot-app.vercel.app/assets/newLogo-BTPOwHSu.png"
    );

    const logoWidth = 60;
    const logoHeight = 50;
    const logoX = (pdfWidth - logoWidth) / 2;
    const logoY = 15;

    if (logoBase64) {
      pdf.addImage(logoBase64, "PNG", logoX, logoY, logoWidth, logoHeight);
    } else {
      console.warn("Logo skipped due to fetch error.");
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text(
      "Second Shot Career Prep Toolbox Report",
      pdfWidth / 2,
      logoY + logoHeight + 2,
      { align: "center" }
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(
      `Prepared For: ${profilename}`,
      pdfWidth / 2,
      logoY + logoHeight + 8,
      { align: "center" }
    );

    // ✅ Add captured image to PDF
    const imgData = paddedCanvas.toDataURL("image/jpeg", 0.8);
    if (!imgData.startsWith("data:image")) {
      throw new Error("Snapshot image invalid or empty");
    }

    const contentWidth = pdfWidth - 20;
    const contentHeight =
      (paddedCanvas.height * contentWidth) / paddedCanvas.width;
    const snapshotY = logoY + logoHeight + 20;

    pdf.addImage(imgData, "JPEG", 10, snapshotY, contentWidth, contentHeight);

    // Add structured content to second page
    pdf.addPage();
    addStructuredContent(pdf, userData, subscriptionpaid);

    // ✅ Save file
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating combined PDF:", error);
  } finally {
    document
      .querySelectorAll(".pdf-exclude")
      .forEach((el) => (el.style.display = ""));
    setIsSnapshot(false);
  }
};

/**
 * Adds structured content to the PDF (adapted from your existing generateProfilePDF function)
 *
 * @param {jsPDF} doc - The PDF document to add content to
 * @param {Object} userData - User data object
 */
function addStructuredContent(doc, userData, subscriptionpaid) {
  // Set page margins (in mm)
  const pageWidth = 210; // A4 width
  const leftMargin = 20;
  const rightMargin = 20;
  const maxLineWidth = pageWidth - leftMargin - rightMargin;

  // Set font size and style
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Helper function to wrap text and return new Y position
  const wrapText = (text, x, y, maxWidth, lineHeight) => {
    if (!text) return y;

    // Split the text into words
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth =
        (doc.getStringUnitWidth(testLine) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;

      if (testWidth > maxWidth && i > 0) {
        doc.text(line.trim(), x, currentY);
        line = words[i] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }

    // Print the last line
    if (line.trim() !== "") {
      doc.text(line.trim(), x, currentY);
      currentY += lineHeight;
    }

    return currentY;
  };

  // Helper function to add section title
  const addSectionTitle = (title, y) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title || "Untitled Section", leftMargin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    return y + 8;
  };
  let yPosition = 20;

  // Helper function to add a numbered list item with subitems
  const addListItem = (number, text, y, subitems = []) => {
    doc.text(`${number}. ${text || "No title"}`, leftMargin, y);
    let currentY = y + 6;

    if (Array.isArray(subitems)) {
      subitems.forEach((item, index) => {
        if (item) {
          const letter = String.fromCharCode(97 + index); // a, b, c, ...
          const description =
            item.description ||
            (typeof item === "string" ? item : "No description available");

          // Initial position for the prefix (a., b., etc)
          doc.text(`    ${letter}.`, leftMargin, currentY);

          // Calculate indent for the wrapped text (prefix width)
          const prefixWidth =
            (doc.getStringUnitWidth(`    ${letter}. `) *
              doc.internal.getFontSize()) /
            doc.internal.scaleFactor;
          const indentedX = leftMargin + prefixWidth;
          const indentedMaxWidth = maxLineWidth - prefixWidth;

          // Position for the start of the description text
          const descStartY = currentY;

          // Wrap and draw the description text with proper indentation
          currentY = wrapText(
            description,
            indentedX,
            descStartY,
            indentedMaxWidth,
            6
          );
        }
      });
    }

    return currentY;
  };

  // Add Sport section if athlete data exists
  if (
    userData?.is_athlete &&
    userData?.athlete &&
    userData?.athlete?.primary_sport
  ) {
    yPosition = addSectionTitle(
      `Sport: ${userData?.athlete?.primary_sport?.sport_name}`,
      yPosition
    );

    // Add Position section if athlete data exists
    if (
      userData.is_athlete &&
      userData.athlete &&
      userData.athlete.primary_sport
    ) {
      // Extract topics from the hobby data
      const hobbyTopics = userData.athlete.primary_sport.topics || [];
      if (Array.isArray(hobbyTopics)) {
        hobbyTopics.forEach((topic, index) => {
          if (topic && index <= hobbyTopics.length - 1) {
            // Limit to first 2 topics to match format in image
            const prevPosition = yPosition;
            yPosition = addListItem(index + 1, topic.title, yPosition, [
              { description: topic.description || "No description available" },
            ]);

            // Check if we need a new page after adding this item
            if (yPosition > 250) {
              doc.addPage();
              yPosition = 20;
            }
          }
        });
      }

      yPosition += 10;
    }
  }

  // Add Military section if data exists
  if (
    userData?.is_athlete &&
    userData?.athlete &&
    userData?.athlete?.sport_position
  ) {
    yPosition = addSectionTitle(
      `Position: ${userData?.athlete?.sport_position?.position_name}`,
      yPosition
    );

    // Add Position section if athlete data exists
    if (
      userData.is_athlete &&
      userData.athlete &&
      userData.athlete.sport_position
    ) {
      // Extract topics from the hobby data
      const hobbyTopics = userData.athlete.sport_position.topics || [];
      if (Array.isArray(hobbyTopics)) {
        hobbyTopics.forEach((topic, index) => {
          if (topic && index <= hobbyTopics.length - 1) {
            // Limit to first 2 topics to match format in image
            const prevPosition = yPosition;
            yPosition = addListItem(index + 1, topic.title, yPosition, [
              { description: topic.description || "No description available" },
            ]);

            // Check if we need a new page after adding this item
            if (yPosition > 250) {
              doc.addPage();
              yPosition = 20;
            }
          }
        });
      }

      yPosition += 10;
    }
  }

  // Check if we need to start a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Add Favorite Subject section
 if (
  subscriptionpaid &&
  userData?.military &&
  userData?.military?.branch_of_service &&
  userData?.military?.rank
) {
  // Military Section
  const subjectName =
    userData.military.rank?.rank_name || "Unnamed Subject";

  yPosition = addSectionTitle(`Military: ${subjectName}`, yPosition);

  const subjectTopics = userData?.military?.rank?.topics || [];
  subjectTopics.forEach((topic, index) => {
    if (topic) {
      yPosition = addListItem(index + 1, topic.title, yPosition, [
        { description: topic.description || "No description available" },
      ]);

      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    }
  });

  yPosition += 10;
}
else if (subscriptionpaid && userData.favorite_middle_school_subject) {
  // Favorite Subject Section
  const subjectName =
    userData.favorite_middle_school_subject.subject_name ||
    "Unnamed Subject";

  yPosition = addSectionTitle(`Favorite Subject: ${subjectName}`, yPosition);

  const subjectTopics =
    userData?.favorite_middle_school_subject?.topics || [];

  subjectTopics.forEach((topic, index) => {
    if (topic) {
      yPosition = addListItem(index + 1, topic.title, yPosition, [
        { description: topic.description || "No description available" },
      ]);

      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    }
  });

  yPosition += 10;
}



  // Check if we need to start a new page

  // Check if we need to start a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Add Hobby 1 section
  if (subscriptionpaid && userData.favorite_hobby1) {
    const hobbyName = userData.favorite_hobby1.hobbie_name || "Unnamed Hobby";
    yPosition = addSectionTitle(`Favorite Hobby: ${hobbyName}`, yPosition);

    // Extract topics from the hobby data
    const hobbyTopics = userData.favorite_hobby1.topics || [];
    if (Array.isArray(hobbyTopics)) {
      hobbyTopics.forEach((topic, index) => {
        if (topic && index <= hobbyTopics.length - 1) {
          const prevPosition = yPosition;
          yPosition = addListItem(index + 1, topic.title, yPosition, [
            { description: topic.description || "No description available" },
          ]);

          // Check if we need a new page after adding this item
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
        }
      });
    }

    yPosition += 10;
  }

  // Check if we need to start a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Add Hobby 2 section
  if (subscriptionpaid && userData.favorite_hobby2) {
    const hobbyName = userData.favorite_hobby2.hobbie_name || "Unnamed Hobby";
    yPosition = addSectionTitle(`Favorite Hobby 2: ${hobbyName}`, yPosition);

    // Extract topics from the hobby data
    const hobbyTopics = userData.favorite_hobby2.topics || [];
    if (Array.isArray(hobbyTopics)) {
      hobbyTopics.forEach((topic, index) => {
        if (topic && index <= hobbyTopics.length - 1) {
          const prevPosition = yPosition;
          yPosition = addListItem(index + 1, topic.title, yPosition, [
            { description: topic.description || "No description available" },
          ]);

          // Check if we need a new page after adding this item
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
        }
      });
    }
  }

  // Add End of document marker on the last page
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "End of document",
    pageWidth - rightMargin,
    280,
    null,
    null,
    "right"
  );

  return doc;
}

/**
 * Helper function to handle different data formats and normalize user data
 *
 * @param {Object|Array} data - User data in various formats
 * @returns {Object|null} - Normalized user data object
 */
function normalizeUserData(data) {
  let userData = null;

  if (!data || typeof data !== "object") {
    return null;
  }

  if (Array.isArray(data) && data.length > 0) {
    userData = data[0];
  } else if (data._id) {
    userData = data;
  }

  return userData;
}

/**
 * Main function to call for downloading the combined PDF
 *
 * @param {Object|Array} data - User data in various formats
 * @param {string} elementId - ID of the HTML element to capture
 * @param {string} filename - Name for the downloaded file
 */
export const downloadCombinedPDF = async (
  data,
  elementId,
  filename = "profile-report.pdf",
  setDownloading,
  subscriptionpaid,
  profilename,
  setIsSnapshot,
  loaders
) => {
  // if (loaders === true) {
  //   setDownloading(true);
  // } else {
  //   setDownloading(false);
  // }

  try {
    if (loaders) setDownloading(true);
    setIsSnapshot(true); // Set the snapshot state to true
    const userData = normalizeUserData(data);
    if (!userData) {
      console.error("No valid user data available for PDF generation");
      return;
    }

    await generateCombinedPDF(
      userData,
      elementId,
      filename,
      subscriptionpaid,
      profilename,
      setIsSnapshot
    );
  } catch (error) {
    console.error("Error generating combined PDF:", error);
  } finally {
    setDownloading(false);
    setIsSnapshot(false);
  }
};

export const sendCombinedPDF = async (
  userData,
  elementId,
  filename = "profile-report.pdf",
  subscriptionpaid,
  profilename
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

      const paddedCanvas = document.createElement("canvas");
      const ctx = paddedCanvas.getContext("2d");
      paddedCanvas.width = canvas.width + 2 * padding;
      paddedCanvas.height = canvas.height + 2 * padding;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
      ctx.drawImage(canvas, padding, padding);

      // Create PDF document (existing code)
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      // STEP 3: Add logo, heading, and subheading to the first page
      // Calculate content width to match snapshot width
      const contentWidth = pdfWidth - 20; // Keep some margin
      const leftMargin = 20; // Left margin for alignment

      // Add logo (you'll need to have the logo available)
      const logoWidth = 40; // adjust as needed, in mm
      const logoHeight = 40; // adjust as needed, in mm
      const logoX = (pdfWidth - logoWidth) / 2; // Center horizontally
      const logoY = 15; // Position from top

      // Add your logo - use a base64 string or a URL (commented out as before)
      pdf.addImage(
        logo,
        "PNG",
        logoX,
        logoY,
        logoWidth,
        logoHeight
      );

      // Center the main title
      // Set up coordinates
      const titleY = logoY + logoHeight + 1;
      const preparedForY = titleY + 6;
      const transferableY = preparedForY + 5; // Give some space below "Prepared For"

      // Title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("Second Shot Career Prep Toolbox Report", pdfWidth / 2, titleY, {
        align: "center",
      });

      // Prepared For
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(`Prepared For : ${profilename}`, pdfWidth / 2, preparedForY, {
        align: "center",
      });

      // ✅ Transferable Skills Report (LEFT aligned)
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("Transferable Skills Report", leftMargin, transferableY);

      // Add subheading also aligned to the left, positioned below the heading
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);

      // Reset font
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      // Position of snapshot image - adjusted to be below the header content
      const snapshotY = logoY + logoHeight + 25; // Adjust this value as needed

      // Calculate content height maintaining aspect ratio
      const contentHeight =
        (paddedCanvas.height * contentWidth) / paddedCanvas.width;

      // Add snapshot image to first page - adjust Y position
      pdf.addImage(
        paddedCanvas.toDataURL("image/jpeg", 0.7),
        "JPEG",
        10, // x position
        snapshotY, // y position - adjusted
        contentWidth,
        contentHeight
      );

      // STEP 4: Generate and add structured data on subsequent pages
      pdf.addPage(); // Add new page for structured data
      addStructuredContent(pdf, userData, subscriptionpaid); // Add the structured data

      // STEP 5: Return the PDF blob
      return pdf.output("blob");
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

export const downloadSendCombinedPDF = async (
  data,
  elementId,
  filename = "profile-report.pdf",
  setDownloading,
  subscriptionpaid,
  profilename
) => {
  setDownloading(true);
  try {
    const userData = normalizeUserData(data);

    if (!userData) {
      console.error("No valid user data available for PDF generation");
      return null;
    }

    // Now returns the blob instead of saving the file
    const pdfBlob = await sendCombinedPDF(
      userData,
      elementId,
      filename,
      subscriptionpaid,
      profilename
    );
    return pdfBlob;
  } catch (error) {
    console.error("Error generating combined PDF:", error);
    return null;
  } finally {
    setDownloading(false);
  }
};
