// ================================
// PROJETOS BI - JAVASCRIPT PREMIUM
// Sistema Interativo Avançado
// ================================

let isModalOpen = false;
let currentFilter = 'all';

// =============================================
// UTILITÁRIOS
// =============================================

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
// ANIMAÇÕES DE CONTADOR
// =============================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// =============================================
// FILTROS DE PROJETOS
// =============================================

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Atualizar botões ativos
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtrar projetos
            filterProjects(filter, projectCards);
            currentFilter = filter;
        });
    });
}

function filterProjects(filter, cards) {
    cards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// =============================================
// MODAL DE PROJETOS
// =============================================

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalBody) return;

    // Dados dos projetos
    const projectData = getProjectData(projectId);

    if (projectData) {
        modalBody.innerHTML = generateModalContent(projectData);
        modal.classList.add('active');
        isModalOpen = true;
        document.body.style.overflow = 'hidden';

        // Adicionar event listeners para imagens
        initModalImageHandlers();
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');

    if (modal) {
        modal.classList.remove('active');
        isModalOpen = false;
        document.body.style.overflow = 'auto';
    }
}

function openProjectDemo(projectId) {
    // Simulação de abertura de demo
    showNotification(`Demo do projeto "${projectId}" será disponibilizado em breve!`, 'info');
}

function getProjectData(projectId) {
    const projects = {
        'toners': {
            title: 'Dashboard de Monitoramento de Toners',
            category: 'DASHBOARD OPERACIONAL',
            description: 'Sistema completo de monitoramento preventivo de níveis de toner em impressoras corporativas, desenvolvido para otimizar a gestão de suprimentos e reduzir interrupções operacionais.',
            challenge: 'A empresa enfrentava constantes interrupções na impressão devido ao esgotamento inesperado de toners, causando perda de produtividade e aumento de custos operacionais.',
            solution: 'Desenvolvemos um dashboard em Power BI que monitora os níveis de toner em tempo real, com alertas preventivos e sistema de priorização automática para reposição.',
            features: [
                'Monitoramento em tempo real dos níveis de toner',
                'Sistema de alertas preventivos configuráveis',
                'Priorização automática baseada em criticidade',
                'Histórico de consumo e previsão de necessidades',
                'Integração com sistema de compras',
                'Relatórios de economia e eficiência'
            ],
            technologies: ['Power BI', 'DAX', 'SQL Server', 'Power Query', 'Excel'],
            results: [
                'Redução de 40% nos incidentes por falta de toner',
                'Economia de 25% nos custos de suprimentos',
                'Melhoria de 60% na eficiência do processo de reposição',
                'ROI de 300% em 6 meses'
            ],
            images: [
                'images/toners-dashboard-01.jpg',
                'images/toners-dashboard-02.jpg',
                'images/toners-dashboard-03.jpg'
            ]
        },
        'maquinas': {
            title: 'BI - Controle de Máquinas',
            category: 'ANÁLISE OPERACIONAL',
            description: 'Sistema abrangente de Business Intelligence para análise de conformidade e controle operacional de empilhadeiras, proporcionando visibilidade total sobre performance, manutenção e segurança.',
            challenge: 'Falta de visibilidade sobre a conformidade operacional das empilhadeiras, resultando em falhas não previstas, custos elevados de manutenção e riscos de segurança.',
            solution: 'Implementamos uma solução de BI que centraliza dados operacionais, analisa padrões de falhas e gera insights para manutenção preditiva e controle de conformidade.',
            features: [
                'Dashboard de conformidade operacional',
                'Análise preditiva de falhas',
                'Controle de manutenções preventivas',
                'Indicadores de performance por equipamento',
                'Relatórios de segurança e conformidade',
                'Alertas automáticos para anomalias'
            ],
            technologies: ['Power BI', 'Power Query', 'Excel', 'SQL', 'Data Analysis'],
            results: [
                'Redução de 30% nas falhas não programadas',
                'Aumento de 95% na conformidade operacional',
                'Melhoria de 45% na eficiência de manutenção',
                'Redução de 20% nos custos operacionais'
            ],
            images: [
                'images/maquinas-dashboard-01.jpg',
                'images/maquinas-dashboard-02.jpg'
            ]
        },
        'dashboard-vendas': {
            title: 'Dashboard de Vendas',
            category: 'DASHBOARD COMERCIAL',
            description: 'Dashboard executivo para análise completa de performance comercial, incluindo métricas de vendas, acompanhamento de metas e previsões estratégicas.',
            challenge: 'Dispersão de informações comerciais em múltiplas planilhas, dificultando a análise integrada e tomada de decisões estratégicas em tempo hábil.',
            solution: 'Criação de dashboard unificado que consolida todas as métricas comerciais, oferecendo visão 360° da performance de vendas com análises preditivas.',
            features: [
                'Visão consolidada de vendas por período',
                'Acompanhamento de metas vs realizado',
                'Análise de performance por vendedor',
                'Ranking de produtos mais vendidos',
                'Previsão de vendas com IA',
                'Alertas de desvio de meta'
            ],
            technologies: ['Power BI', 'DAX', 'Excel', 'SQL Server'],
            results: [
                'Aumento de 25% na precisão de forecasting',
                'Redução de 50% no tempo de análise comercial',
                'Melhoria de 35% no atingimento de metas',
                'Economia de 15 horas/semana da equipe comercial'
            ]
        },
        'relatorio-financeiro': {
            title: 'Relatório Financeiro Automatizado',
            category: 'RELATÓRIO EXECUTIVO',
            description: 'Sistema automatizado de relatórios financeiros com análise de indicadores de performance e rentabilidade, proporcionando visão estratégica das finanças corporativas.',
            challenge: 'Processo manual de consolidação financeira consumia muito tempo e estava sujeito a erros, atrasando a entrega de informações críticas para a gestão.',
            solution: 'Automatização completa do processo de relatórios financeiros com validações automáticas, cálculos padronizados e distribuição automática.',
            features: [
                'Consolidação automática de dados financeiros',
                'Cálculo automatizado de indicadores',
                'Comparativos históricos e benchmarks',
                'Análise de variações e desvios',
                'Relatórios personalizados por stakeholder',
                'Distribuição automática via email'
            ],
            technologies: ['Power BI', 'SQL Server', 'Python', 'DAX'],
            results: [
                'Redução de 80% no tempo de consolidação',
                'Eliminação de 95% dos erros manuais',
                'Entrega de relatórios 3 dias mais cedo',
                'Economia de 20 horas/mês da equipe financeira'
            ]
        }
    };

    return projects[projectId] || null;
}

function generateModalContent(project) {
    return `
        <div class="modal-header">
            <div class="project-category-modal">${project.category}</div>
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-description">${project.description}</p>
        </div>

        <div class="modal-content-sections">
            <div class="modal-section">
                <h3>🎯 Desafio</h3>
                <p>${project.challenge}</p>
            </div>

            <div class="modal-section">
                <h3>💡 Solução</h3>
                <p>${project.solution}</p>
            </div>

            <div class="modal-section">
                <h3>⚡ Funcionalidades</h3>
                <ul class="features-list">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h3>🛠️ Tecnologias</h3>
                <div class="tech-tags-modal">
                    ${project.technologies.map(tech => `<span class="tech-tag-modal">${tech}</span>`).join('')}
                </div>
            </div>

            <div class="modal-section">
                <h3>📈 Resultados</h3>
                <div class="results-grid">
                    ${project.results.map(result => `
                        <div class="result-item">
                            <div class="result-icon">✅</div>
                            <p>${result}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${project.images ? `
                <div class="modal-section">
                    <h3>🖼️ Screenshots</h3>
                    <div class="modal-gallery">
                        ${project.images.map((image, index) => `
                            <div class="gallery-item" onclick="openImageModal('${image}')">
                                <div class="gallery-placeholder">
                                    <div class="gallery-icon">🖼️</div>
                                    <p>Visualização ${index + 1}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <p class="gallery-note">* Imagens serão adicionadas em breve</p>
                </div>
            ` : ''}
        </div>

        <div class="modal-actions">
            <button class="btn btn-primary" onclick="requestAccess('${project.title}')">
                <span>SOLICITAR ACESSO</span>
                <i class="btn-icon">→</i>
            </button>
            <button class="btn btn-outline" onclick="closeProjectModal()">
                <span>FECHAR</span>
            </button>
        </div>
    `;
}

function initModalImageHandlers() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Simular abertura de imagem
            showNotification('Visualização de imagens será implementada em breve!', 'info');
        });
    });
}

function openImageModal(imageSrc) {
    showNotification('Visualização de imagens em desenvolvimento...', 'info');
}

function requestAccess(projectTitle) {
    showNotification(`Solicitação de acesso ao projeto "${projectTitle}" enviada! Em breve entraremos em contato.`, 'success');
}

// =============================================
// SISTEMA DE NOTIFICAÇÕES
// =============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#FF6B6B' : '#FFD700'};
        color: ${type === 'info' ? '#0D1117' : 'white'};
        padding: 16px 24px;
        border-radius: 12px;
        z-index: 10001;
        font-family: var(--font-secondary);
        font-size: 14px;
        font-weight: 600;
        max-width: 400px;
        box-shadow: var(--shadow-lg);
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 4.7s forwards;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// =============================================
// SCROLL ANIMATIONS
// =============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll(`
        .featured-project,
        .project-card,
        .hero-stat
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================

function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;

        if (scrollTop > 50) {
            navbar.style.background = 'rgba(13, 17, 23, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }, 100));
}

// =============================================
// EVENTOS DE TECLADO
// =============================================

function initKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            closeProjectModal();
        }
    });
}

// =============================================
// INICIALIZAÇÃO
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o usuário prefere movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        initScrollAnimations();
        initCounterAnimation();
    }

    // Inicializar funcionalidades
    initProjectFilters();
    initNavbarScrollEffect();
    initKeyboardEvents();

    // Loading suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// =============================================
// CSS ANIMATIONS (Adicionado via JavaScript)
// =============================================

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .modal-header {
        margin-bottom: 2rem;
        text-align: center;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 2rem;
    }

    .project-category-modal {
        font-family: var(--font-mono);
        font-size: 12px;
        font-weight: 600;
        color: var(--primary-gold);
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 1rem;
    }

    .modal-title {
        font-family: var(--font-primary);
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 1rem;
    }

    .modal-description {
        font-size: 1.1rem;
        color: var(--text-secondary);
        line-height: 1.6;
    }

    .modal-content-sections {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .modal-section h3 {
        font-family: var(--font-primary);
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1rem;
    }

    .modal-section p {
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 1rem;
    }

    .features-list {
        list-style: none;
        display: grid;
        gap: 0.75rem;
    }

    .features-list li {
        padding: 0.75rem 1rem;
        background: var(--bg-glass);
        border: var(--border-width) solid var(--border-color);
        border-radius: var(--border-radius-sm);
        color: var(--text-secondary);
        position: relative;
        padding-left: 2.5rem;
    }

    .features-list li::before {
        content: '✓';
        position: absolute;
        left: 1rem;
        color: var(--primary-gold);
        font-weight: bold;
    }

    .tech-tags-modal {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .tech-tag-modal {
        padding: 0.5rem 1rem;
        background: var(--gradient-primary);
        color: var(--text-dark);
        border-radius: var(--border-radius-sm);
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

    .result-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--bg-glass);
        border: var(--border-width) solid var(--border-color);
        border-radius: var(--border-radius-sm);
    }

    .result-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
    }

    .result-item p {
        margin: 0;
        font-weight: 500;
        color: var(--text-secondary);
    }

    .modal-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .gallery-item {
        cursor: pointer;
        transition: var(--transition);
    }

    .gallery-item:hover {
        transform: scale(1.02);
    }

    .gallery-placeholder {
        height: 150px;
        background: var(--bg-darker);
        border: var(--border-width) solid var(--border-color);
        border-radius: var(--border-radius-sm);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .gallery-icon {
        font-size: 2rem;
        opacity: 0.6;
    }

    .gallery-placeholder p {
        font-size: 0.9rem;
        color: var(--text-muted);
        margin: 0;
    }

    .gallery-note {
        font-size: 0.85rem;
        color: var(--text-muted);
        text-align: center;
        font-style: italic;
    }

    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
    }
`;

document.head.appendChild(styleSheet);

// Exportar funções para uso global
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.openProjectDemo = openProjectDemo;
window.requestAccess = requestAccess;
