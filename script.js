// Link Data Structure
const data = {
    personal: [
        { name: "My Portfolio", url: "https://example.com/portfolio" },
        { name: "GitHub", url: "https://github.com" },
        { name: "LinkedIn", url: "https://linkedin.com" },
        { name: "Twitter", url: "https://twitter.com" },
        { name: "My Portfolio", url: "https://example.com/portfolio" },
        { name: "GitHub", url: "https://github.com" },
        { name: "LinkedIn", url: "https://linkedin.com" },
    ],
    company: [
        { name: "Company Dashboard", url: "https://company.com/dashboard" },
        { name: "Webmail", url: "https://mail.company.com" },
        { name: "HR Portal", url: "https://hr.company.com" },
        { name: "Project Management", url: "https://projects.company.com" }
    ],
    demo: [
        { name: "Frames.com", url: "https://frames.com", username: "demo_user", password: "demo_password" },
        { name: "Sample Website 1", url: "https://example.com", username: "user1", password: "password123" },
        { name: "Demo Application", url: "https://demo.example.com", username: "admin", password: "admin_password" },
        { name: "Test Portal", url: "https://test.com", username: "test_user", password: "test_password" }
    ]
};

// SVG Icon Template
const getIcon = () => `<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

// Render Links
function renderLinks(sectionId, linksData, sectionClass) {
    const container = document.getElementById(sectionId);
    container.innerHTML = ''; // Clear existing

    linksData.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = "_blank";
        a.className = `link-card ${sectionClass}`;
        a.style.display = 'flex';
        a.style.justifyContent = 'space-between';
        a.style.alignItems = 'center';

        const contentDiv = document.createElement('div');
        contentDiv.style.display = 'flex';
        contentDiv.style.alignItems = 'center';
        contentDiv.style.gap = '0.75rem';
        contentDiv.innerHTML = `
            ${getIcon()}
            <span>${link.name}</span>
        `;
        a.appendChild(contentDiv);

        if (sectionId === 'demo-links') {
            const btn = document.createElement('button');
            btn.className = 'credentials-btn';
            btn.title = "View Credentials";
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
            btn.onclick = (e) => {
                e.preventDefault();
                showCredentialsModal(link.name, link.username, link.password);
            };
            a.appendChild(btn);
        }

        container.appendChild(a);
    });
}

function showCredentialsModal(name, username, password) {
    let modal = document.getElementById('credentials-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'credentials-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '1000';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'glass-panel';
        modalContent.style.width = '100%';
        modalContent.style.maxWidth = '350px';
        modalContent.style.padding = '2rem';
        modalContent.style.position = 'relative';
        
        modalContent.innerHTML = `
            <button id="close-modal" style="position:absolute; top: 15px; right: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-light); transition: color 0.2s;">&times;</button>
            <div style="display:flex; align-items:center; gap: 0.75rem; margin-bottom: 1.5rem;">
                <div class="icon-wrap gold-bg" style="width: 32px; height: 32px; border-radius: 8px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <h3 id="modal-title" style="font-size: 1.25rem; font-weight: 600; color: var(--color-text);"></h3>
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--color-text-light); margin-bottom: 0.5rem;">Username</label>
                <div style="padding: 0.75rem; background: var(--color-bg); border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 1rem; color: var(--color-text);" id="modal-username"></div>
            </div>
            <div>
                <label style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--color-text-light); margin-bottom: 0.5rem;">Password</label>
                <div style="padding: 0.75rem; background: var(--color-bg); border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 1rem; color: var(--color-text);" id="modal-password"></div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        document.getElementById('close-modal').onclick = () => {
            modal.style.display = 'none';
        };
        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = 'none';
        };
        // hover effect for close button
        const closeBtn = document.getElementById('close-modal');
        closeBtn.onmouseenter = () => closeBtn.style.color = 'var(--color-text)';
        closeBtn.onmouseleave = () => closeBtn.style.color = 'var(--color-text-light)';
    }
    
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-username').textContent = username || 'Not set';
    document.getElementById('modal-password').textContent = password || 'Not set';
    
    modal.style.display = 'flex';
}

// Initialize public sections
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('personal-links')) {
        renderLinks('personal-links', data.personal, '');
    }
    if (document.getElementById('company-links')) {
        renderLinks('company-links', data.company, 'company-link');
    }
});

// Auth Logic for Demo Section
const TARGET_PASSWORD_HASH = "149be98fbbd6bd7eb856ca7f99f6e5417774b4c6be23752a8d614746c569b29d";

async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const unlockBtn = document.getElementById('unlock-btn');
const passwordInput = document.getElementById('demo-password');
const authError = document.getElementById('auth-error');
const authContainer = document.getElementById('auth-container');
const demoLinks = document.getElementById('demo-links');
const demoSection = document.getElementById('demo-section');

async function handleUnlock() {
    const inputVal = passwordInput.value;
    if (!inputVal) return;

    try {
        const inputHash = await hashPassword(inputVal);

        if (inputHash === TARGET_PASSWORD_HASH) {
            // Success
            authContainer.classList.add('hidden');
            demoLinks.classList.remove('hidden');

            renderLinks('demo-links', data.demo, 'demo-link');
        } else {
            // Error
            authError.textContent = "Incorrect password. Please try again.";
            passwordInput.value = '';
            setTimeout(() => {
                authError.textContent = "";
            }, 3000);
        }
    } catch (err) {
        console.error(err);
        authError.textContent = "Error: Hashing requires localhost or HTTPS.";
    }
}

if (unlockBtn) {
    unlockBtn.addEventListener('click', handleUnlock);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUnlock();
    });
}

const togglePwdBtn = document.getElementById('toggle-pwd-btn');
const eyeIcon = document.getElementById('eye-icon');

if (togglePwdBtn) {
    togglePwdBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
        } else {
            passwordInput.type = 'password';
            eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
        }
    });
}
