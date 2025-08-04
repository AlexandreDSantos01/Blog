// IDs do Contentful
const spaceId = '53kefjd2efll';
const accessToken = 'eSOUdg3bakHIQLbYWK4f0s8rObSff2aDAcvWceiaeA8';

// URL da API
const url = `https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}&content_type=post`;

// Função para buscar os posts
async function fetchPosts() {
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log('✅ Dados recebidos do Contentful:', data);

    const container1 = document.getElementById('post1');
    const container2 = document.getElementById('post2');

    // Verifica se os containers existem
    if (!container1 || !container2) {
      console.error('❌ Containers post1 ou post2 não encontrados no HTML.');
      return;
    }

    // Pega a função documentToHtmlString da biblioteca carregada via CDN
    const documentToHtmlString = window["@contentful/rich-text-html-renderer"]?.documentToHtmlString;

    if (!documentToHtmlString) {
      console.error('❌ Função documentToHtmlString não encontrada. Verifique se a biblioteca foi carregada no <head>.');
      return;
    }

    data.items.forEach((item, index) => {
      const title = item.fields.TextoCurto || 'Sem título';
      const richTextContent = item.fields.Texto;

      const htmlContent = documentToHtmlString(richTextContent);

      const postDiv = document.createElement('div');
      postDiv.className = 'post';
      postDiv.innerHTML = `
        <h2>${title}</h2>
        <div>${htmlContent}</div>
      `;

      if (index % 2 === 0) {
        container1.appendChild(postDiv);
      } else {
        container2.appendChild(postDiv);
      }
    });

  } catch (error) {
    console.error('❌ Erro ao buscar posts:', error);
  }
}

fetchPosts();

// ========== MENU HAMBÚRGUER ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
}

// ========== DARK MODE ==========
const toggle = document.getElementById('darkModeToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}

// ========== BOTÃO VOLTAR AO TOPO ==========
const scrollBtn = document.getElementById('scrollTopBtn');

window.onscroll = () => {
  if (scrollBtn) {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  }
};

if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== FORMULÁRIO (opcional) ==========
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    if (name === '' || email === '' || message === '') {
      if (formMessage) {
        formMessage.textContent = 'Por favor, preencha todos os campos.';
        formMessage.style.color = 'red';
      }
      return;
    }

    if (formMessage) {
      formMessage.style.color = 'green';
      formMessage.textContent = `Obrigado, ${name}! Sua mensagem foi enviada.`;
    }

    this.reset();
  });
}
