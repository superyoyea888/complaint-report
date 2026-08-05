// ตัวแปรเก็บรูปภาพแบบ Base64
let globalUploadedImage = "";

/**
 * 1. ฟังก์ชั่นย่อรูปภาพจากหน้า index.html อัตโนมัติ (เพื่อไม่ให้ไฟล์ใหญ่เกินไป)
 */
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      const MAX_WIDTH = 1024;
      const MAX_HEIGHT = 1024;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // ย่อและแปลงเป็น JPEG Quality 75%
      globalUploadedImage = canvas.toDataURL("image/jpeg", 0.75);
      console.log("ย่อรูปภาพเรียบร้อยแล้ว");
    };
  };
}

/**
 * 2. ฟังก์ชั่นกดส่งฟอร์มจากหน้า index.html
 */
function submitForm(event) {
  event.preventDefault();

  const now = new Date();
  const dateStr = now.toLocaleDateString('th-TH') + ' ' + now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const randomId = 'REQ-' + now.getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

  const formData = {
    id: randomId,
    date: dateStr,
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    category: document.getElementById('category').value,
    urgency: document.getElementById('urgency').value,
    location: document.getElementById('location').value,
    detail: document.getElementById('detail').value,
    department: 'สำนักการช่าง', // ค่าเริ่มต้นหรือปรับตาม category ได้
    officer: 'เจ้าหน้าที่รับเรื่อง',
    imageUrl: globalUploadedImage || ''
  };

  // บันทึกลง LocalStorage ไว้ทดสอบชั่วคราว
  localStorage.setItem('latestComplaint', JSON.stringify(formData));

  alert('บันทึกเรื่องร้องเรียนเรียบร้อยแล้ว!');
  window.location.href = 'admin.html'; // ส่งต่อไปหน้า Admin เพื่อดู/พิมพ์
}

/**
 * 3. ฟังก์ชั่นดึงข้อมูลมาใส่ลงในใบคำร้อง A4 หน้า admin.html
 */
function populatePrintForm(data) {
  if (!data) return;

  if (document.getElementById('printId')) document.getElementById('printId').innerText = data.id || '-';
  if (document.getElementById('printDate')) document.getElementById('printDate').innerText = data.date || '-';
  if (document.getElementById('printName')) document.getElementById('printName').innerText = data.name || '-';
  if (document.getElementById('printPhone')) document.getElementById('printPhone').innerText = data.phone || '-';
  if (document.getElementById('printCategory')) document.getElementById('printCategory').innerText = data.category || '-';
  if (document.getElementById('printColor')) document.getElementById('printColor').innerText = data.urgency || '-';
  if (document.getElementById('printLocation')) document.getElementById('printLocation').innerText = data.location || '-';
  if (document.getElementById('printDept')) document.getElementById('printDept').innerText = data.department || 'สำนักการช่าง';
  if (document.getElementById('printOfficer')) document.getElementById('printOfficer').innerText = data.officer || 'เจ้าหน้าที่รับเรื่อง';
  if (document.getElementById('printDetail')) document.getElementById('printDetail').innerText = data.detail || '-';

  // ใส่รูปภาพประกอบ
  const imgElem = document.getElementById('printImage');
  if (imgElem) {
    if (data.imageUrl && data.imageUrl.trim() !== '') {
      imgElem.src = data.imageUrl;
    } else {
      imgElem.src = 'https://via.placeholder.com/600x350?text=ไม่มีรูปภาพประกอบ';
    }
  }
}

/**
 * 4. ฟังก์ชั่นสำหรับดึงข้อมูลล่าสุดตอนเปิดหน้า admin.html
 */
function loadLatestDataToPrint() {
  const savedData = localStorage.getItem('latestComplaint');
  if (savedData) {
    const data = JSON.parse(savedData);
    populatePrintForm(data);
  }
}
