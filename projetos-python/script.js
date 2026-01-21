// ================================
// PROJETOS PYTHON - DAVI GABRIEL
// JavaScript Premium Consistente
// ================================

let isMenuOpen = false;
let scrollTicking = false;

// =============================================
// UTILITÁRIOS
// =============================================

// Debounce function para otimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// =============================================
// NAVEGAÇÃO E MENU
// =============================================

function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navSocial = document.querySelector('.nav-social');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle menu mobile com animações premium
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            navToggle.classList.toggle('active');

            if (navMenu) {
                navMenu.classList.toggle('active');
            }

            if (navSocial) {
                navSocial.classList.toggle('active');
            }

            // Prevenir scroll quando menu está aberto
            document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

            // Adicionar efeito visual no navbar
            if (isMenuOpen) {
                navbar.style.background = 'rgba(13, 17, 23, 0.98)';
            } else {
                navbar.style.background = 'rgba(13, 17, 23, 0.8)';
            }
        });
    }

    // Fechar menu ao clicar em links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
                navSocial?.classList.remove('active');
                document.body.style.overflow = 'auto';
                isMenuOpen = false;
            }
        });
    });

    // Fechar menu ao redimensionar tela
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth >= 769 && isMenuOpen) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            navSocial?.classList.remove('active');
            document.body.style.overflow = 'auto';
            isMenuOpen = false;
        }
    }, 250));

    // Scroll navbar effect
    const handleNavbarScroll = throttle(() => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY > 100;

                if (scrolled) {
                    navbar.style.background = 'rgba(13, 17, 23, 0.95)';
                    navbar.style.backdropFilter = 'blur(20px)';
                    navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.background = 'rgba(13, 17, 23, 0.8)';
                    navbar.style.backdropFilter = 'blur(20px)';
                    navbar.style.boxShadow = 'none';
                }

                scrollTicking = false;
            });
        }
        scrollTicking = true;
    }, 16);

    window.addEventListener('scroll', handleNavbarScroll);
}

// =============================================
// SMOOTH SCROLLING
// =============================================

function initSmoothScrolling() {
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observar elementos com animação de entrada
    document.querySelectorAll('.project-card, .tech-item, .section-header').forEach(el => {
        observer.observe(el);
    });

    // Observar seções dentro do modal
    document.querySelectorAll('.modal-scroll-content .content-section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
}

// =============================================
// MODAL DE PROJETOS
// =============================================

// Dados dos Projetos Python
const projetosData = {
    'automacao-danfe': {
        title: 'Automação de Renomeação e Organização de DANFE',
        content: `
            <!-- Visão Geral do Projeto -->
            <section class="content-section">
                <div class="section-icon">📄</div>
                <h2 class="section-title">Visão Geral do Projeto</h2>
                <div class="content-card">
                    <p class="lead-text">
                        Automação em Python para renomear e organizar documentos fiscais a partir de dados extraídos da DANFE, eliminando processos manuais repetitivos e padronizando a organização de arquivos fiscais.
                    </p>
                </div>
            </section>

            <!-- O Problema -->
            <section class="content-section problem-section">
                <div class="section-icon">⚠️</div>
                <h2 class="section-title">O Problema</h2>
                <div class="content-card">
                    <ul class="problem-list">
                        <li>Renomeação manual de documentos fiscais</li>
                        <li>Retrabalho constante e repetitivo</li>
                        <li>Falta de padronização na organização</li>
                        <li>Risco de erros humanos no processo</li>
                        <li>Perda de tempo operacional</li>
                    </ul>
                </div>
            </section>

            <!-- A Solução -->
            <section class="content-section solution-section">
                <div class="section-icon">✅</div>
                <h2 class="section-title">A Solução</h2>
                <div class="solution-grid">
                    <div class="solution-item">
                        <div class="solution-icon">🔍</div>
                        <h3>Extração Automática</h3>
                        <p>Script em Python que extrai dados relevantes da DANFE</p>
                    </div>
                    <div class="solution-item">
                        <div class="solution-icon">📝</div>
                        <h3>Renomeação Inteligente</h3>
                        <p>Renomeação automática baseada em dados extraídos</p>
                    </div>
                    <div class="solution-item">
                        <div class="solution-icon">📁</div>
                        <h3>Organização Estruturada</h3>
                        <p>Organização automática em pastas por critérios definidos</p>
                    </div>
                    <div class="solution-item">
                        <div class="solution-icon">⚙️</div>
                        <h3>Processo Automatizado</h3>
                        <p>Eliminação completa de intervenção manual</p>
                    </div>
                </div>
            </section>

            <!-- Impacto -->
            <section class="content-section impact-section">
                <div class="section-icon">🚀</div>
                <h2 class="section-title">Impacto Gerado</h2>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-icon">⏱️</div>
                        <h3>Economia de Tempo</h3>
                        <p>Economia significativa de tempo operacional</p>
                    </div>
                    <div class="result-item">
                        <div class="result-icon">📋</div>
                        <h3>Padronização Total</h3>
                        <p>Padronização completa do processo de organização</p>
                    </div>
                    <div class="result-item highlight-result">
                        <div class="result-icon">🏆</div>
                        <h3>Reconhecimento Interno</h3>
                        <p>Reconhecimento interno com premiação pelo projeto</p>
                    </div>
                    <div class="result-item">
                        <div class="result-icon">✅</div>
                        <h3>Eliminação de Erros</h3>
                        <p>Redução de erros humanos no processo</p>
                    </div>
                </div>
            </section>

            <!-- Tecnologias Utilizadas -->
            <section class="content-section tech-section">
                <div class="section-icon">🛠️</div>
                <h2 class="section-title">Tecnologias Utilizadas</h2>
                <div class="tech-grid">
                    <div class="tech-item">
                        <div class="tech-icon">🐍</div>
                        <h3>Python</h3>
                    </div>
                    <div class="tech-item">
                        <div class="tech-icon">⚙️</div>
                        <h3>Automação</h3>
                    </div>
                    <div class="tech-item">
                        <div class="tech-icon">📄</div>
                        <h3>Processos Fiscais</h3>
                    </div>
                </div>
            </section>
        `
    },
    'centralizacao-nfs': {
        title: 'Centralização Automática de Notas Fiscais no Protheus',
        content: `
            <!-- Visão Geral do Projeto -->
            <section class="content-section">
                <div class="section-icon">📧</div>
                <h2 class="section-title">Visão Geral do Projeto</h2>
                <div class="content-card">
                    <p class="lead-text">
                        Fluxo automatizado para recebimento, armazenamento e integração de notas fiscais recebidas por e-mail ao ERP Protheus, centralizando informações fiscais e criando uma base histórica confiável.
                    </p>
                </div>
            </section>

            <!-- O Problema -->
            <section class="content-section problem-section">
                <div class="section-icon">⚠️</div>
                <h2 class="section-title">O Problema</h2>
                <div class="content-card">
                    <ul class="problem-list">
                        <li>Dados fiscais dispersos em diferentes sistemas</li>
                        <li>Dificuldade de consulta histórica</li>
                        <li>Falta de centralização das informações</li>
                        <li>Processo manual de recebimento e armazenamento</li>
                        <li>Risco de perda de documentos importantes</li>
                    </ul>
                </div>
            </section>

            <!-- A Solução -->
            <section class="content-section solution-section">
                <div class="section-icon">✅</div>
                <h2 class="section-title">A Solução</h2>
                <div class="solution-grid">
                    <div class="solution-item">
                        <div class="solution-icon">📧</div>
                        <h3>Recebimento Automático</h3>
                        <p>Monitoramento automático de e-mails com notas fiscais</p>
                    </div>
                    <div class="solution-item">
                        <div class="solution-icon">💾</div>
                        <h3>Armazenamento Estruturado</h3>
                        <p>Armazenamento organizado em banco de dados</p>
                    </div>
                    <div class="solution-item">
                        <div class="solution-icon">🔗</div>
                        <h3>Integração com Protheus</h3>
                        <p>Integração automática com o ERP Protheus</p>
                    </div>
                    <div class="solution-item">
                        <div class="solution-icon">📊</div>
                        <h3>Base Histórica</h3>
                        <p>Criação de base histórica confiável e consultável</p>
                    </div>
                </div>
            </section>

            <!-- Impacto -->
            <section class="content-section impact-section">
                <div class="section-icon">🚀</div>
                <h2 class="section-title">Impacto Gerado</h2>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-icon">📁</div>
                        <h3>Centralização</h3>
                        <p>Centralização completa da informação fiscal</p>
                    </div>
                    <div class="result-item">
                        <div class="result-icon">📚</div>
                        <h3>Base Histórica</h3>
                        <p>Base histórica confiável para consultas</p>
                    </div>
                    <div class="result-item highlight-result">
                        <div class="result-icon">🔍</div>
                        <h3>Suporte a Auditorias</h3>
                        <p>Suporte completo a auditorias e análises fiscais</p>
                    </div>
                    <div class="result-item">
                        <div class="result-icon">⚡</div>
                        <h3>Processo Automatizado</h3>
                        <p>Eliminação de processos manuais</p>
                    </div>
                </div>
            </section>

            <!-- Tecnologias Utilizadas -->
            <section class="content-section tech-section">
                <div class="section-icon">🛠️</div>
                <h2 class="section-title">Tecnologias Utilizadas</h2>
                <div class="tech-grid">
                    <div class="tech-item">
                        <div class="tech-icon">🐍</div>
                        <h3>Python</h3>
                    </div>
                    <div class="tech-item">
                        <div class="tech-icon">💾</div>
                        <h3>Banco de Dados</h3>
                    </div>
                    <div class="tech-item">
                        <div class="tech-icon">🔗</div>
                        <h3>Protheus</h3>
                    </div>
                    <div class="tech-item">
                        <div class="tech-icon">⚙️</div>
                        <h3>Integração</h3>
                    </div>
                </div>
            </section>
        `
    }
};

// Abrir Modal de Projeto
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projetosData[projectId];

    if (!project) {
        console.error('Projeto não encontrado:', projectId);
        return;
    }

    // Inserir conteúdo do projeto
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
        </div>
        <div class="modal-scroll-content">
            ${project.content}
        </div>
    `;

    // Mostrar modal com animação
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reinicializar scroll reveal para o conteúdo do modal
    setTimeout(() => {
        initModalScrollReveal();
    }, 100);
}

// Fechar Modal de Projeto
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Scroll Reveal específico para modal
function initModalScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observar todas as seções dentro do modal
    document.querySelectorAll('.modal-scroll-content .content-section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
}

// =============================================
// ANIMAÇÕES DE ENTRADA
// =============================================

function initEntryAnimations() {
    // Animações de entrada para os cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    const techItems = document.querySelectorAll('.tech-item');

    // Observar e animar cards de projeto
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        cardObserver.observe(card);
    });

    // Animar tech items
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';

        setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(item);
        }, 100);
    });
}

// =============================================
// EVENTOS E INTERAÇÕES
// =============================================

function initEventListeners() {
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });

    // Fechar modal clicando fora
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('projectModal');
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeProjectModal();
        }
    });

    // Prevenir fechamento ao clicar dentro do modal
    document.querySelector('.modal-content')?.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Loading state para cards de projeto
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// =============================================
// PERFORMANCE E OTIMIZAÇÕES
// =============================================

function initPerformanceOptimizations() {
    // Lazy loading para elementos que não estão visíveis
    const lazyElements = document.querySelectorAll('[data-lazy]');

    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.dataset.lazy;

                    if (src) {
                        element.src = src;
                        element.classList.add('loaded');
                    }

                    lazyObserver.unobserve(element);
                }
            });
        });

        lazyElements.forEach(el => lazyObserver.observe(el));
    }

    // Otimizar scroll performance
    let ticking = false;

    function updateScrollElements() {
        // Adicionar efeitos baseados no scroll aqui se necessário
        ticking = false;
    }

    function requestScrollTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollTick);
}

// =============================================
// INICIALIZAÇÃO
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🐍 Projetos Python - Inicializando...');

    // Inicializar todos os módulos
    initNavigation();
    initSmoothScrolling();
    initScrollReveal();
    initEntryAnimations();
    initEventListeners();
    initPerformanceOptimizations();

    console.log('✅ Projetos Python - Carregado com sucesso!');
});

// Error handling global
window.addEventListener('error', function(e) {
    console.error('Erro na aplicação:', e.error);
});

// Prevenir comportamentos indesejados
window.addEventListener('beforeunload', function() {
    // Limpar timeouts e observers se necessário
    document.body.style.overflow = 'auto';
});
