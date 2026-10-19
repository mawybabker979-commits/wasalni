/* ==========================================
   ملف التفاعل (JavaScript) - تطبيق وصلني
   ========================================== */

document.addEventListener("DOMContentLoaded", function() {

    // 1. رسالة ترحيبية تفاعلية بناءً على الوقت
    const welcomeElement = document.getElementById("welcome-msg");
    if (welcomeElement) {
        const currentHour = new Date().getHours();
        let greeting = "أهلاً بك في تطبيق وصلني!";
        
        if (currentHour < 12) {
            greeting = "صباح الخير! ابدأ رحلتك اليوم مع تطبيق وصلني ☀️";
        } else {
            greeting = "مساء الخير! اطلب رحلتك الآمنة الآن مع تطبيق وصلني 🌙";
        }
        
        welcomeElement.textContent = greeting;
    }

    // 2. التفاعل مع أزرار طلب الرحلات في الخريطة أو الرئيسية
    const rideButtons = document.querySelectorAll("button, .btn");
    rideButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            if (this.textContent.includes("طلب") || this.textContent.includes("رحلة") || this.textContent.includes("تأكيد")) {
                // إذا لم يكن نموذج تسجيل دخول أو تواصل، أظهر تنبيه البحث عن كابتن
                if (!this.closest("form")) {
                    alert("📍 تم استلام طلبك! جاري البحث عن أقرب كابتن متاح لخدمتك في تطبيق وصلني...");
                }
            }
        });
    });

    // 3. تأكيد إرسال نموذج التواصل الخاص بتطبيق وصلني
    const contactForm = document.querySelector("form");
    if (contactForm && window.location.pathname.includes("contact.html")) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const nameInput = document.getElementById("name");
            
            if (nameInput && nameInput.value.trim() !== "") {
                alert("شكراً لكِ يا " + nameInput.value + "! تم إرسال رسالتك بنجاح، وسنتواصل معكِ قريباً عبر فريق دعم تطبيق وصلني.");
            } else {
                alert("تم إرسال رسالتك بنجاح، شكراً لتواصلك مع تطبيق وصلني!");
            }
            contactForm.reset(); // مسح الحقول بعد الإرسال
        });
    }

});
