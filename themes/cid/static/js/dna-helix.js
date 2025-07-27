// DNA helix animation for blog index page
document.addEventListener('DOMContentLoaded', function () {
    // =====================================
    // CONFIGURATION VARIABLES
    // =====================================
    const CONFIG = {
        animationDuration: 700, // seconds for one complete cycle (slower = higher number)

        helixRadius: 40,        // radius of the DNA helix (pixels)
        centerX: 40,            // center X position of helix
        basePairSpacing: 45,    // vertical spacing between base pairs (pixels)
        helixTightness: 0.604,  // ~10.4 base pairs per helical turn
        basePairRadius: 5,      // radius of base pair circles

        // Line widths
        backboneStrokeWidth: 3.5,   // width of DNA backbone strands (pixels)
        basePairStrokeWidth: 2,     // width of base pair connecting lines (pixels)

        // Base pair colors
        baseColors: {
            A: '#fd7979',
            T: '#5d71ef',
            G: '#37ec55',
            C: '#c13ae5'
        },

        // Layout
        minScreenHeight: 3000,

        // Animation timing
        animationDelay: 50
    };

    const dnaContainer = document.querySelector('.dna-helix');
    if (!dnaContainer) return;

    // FASTA sequence from Octopus vulgaris genome
    const fastaHeader = '>emb|OX597818.1|:17870118-17872219 Octopus vulgaris genome assembly, chromosome: 5';
    const dnaSequence = 'GAACCAATTATTGATATTAATTTATTTCTCTAATTGATCTTTAATTGCCCGTCAATAAATCCATATGATT' +
        'GTTGTATTTGTTTTAAATTAATCTTCCACCGGTTACCTTTCATGGGGTCCGTATCACTGTTTAAAACAAA' +
        'TATTGTCTGCCGTGGTTTACTTCGAGAGGTTCATGTTATTGTGTATGTCTAACATTATCTGCTATGGCTT' +
        'TTCTCACTGCAATGTGGCCAGACAATATCTGCCTGGCTTCACTTACTGAACATTTATTGATACCAATCAA' +
        'AAGAGCTGTGGGTAACACTTTTGGTGTCCTCTTCGCTATTTGTGTACGTCCGCTGATAGGTTGACATAAC' +
        'TGTTCCTGTGATAATTCATCGGAATCGTACAACACACGCAATACCTGTTTCTCTGCCTCTTCTTGACTCA' +
        'GTTCTGTGAAATCTGTTAAAATTCCAATTGCTCTGTGGTAAAGTTTGTTATTACTTAGTTTCAAGTCCAC' +
        'CATAATATTCTGAAAAACTTTCCCCTTTAAAATATGTGCTCCAGTAGAAATTGCGTTGAGGACCAATTTA' +
        'GCAGCAAATTCACAAAATGCTGTTGACCATTCTTTAGCAACTTTACAATTTATTAAATCGGAGATTTCAT' +
        'TCCAAGGCATTTCAAGATTAATAAATGAATTATTTATTTGTAGTTGGGGTTTAGTTTTTCCAAAGGAATT' +
        'TAAATGAATTTGTATTGTTTTACATTTAGATAAAGATGGTGAAGTTAGGGTAACATCTCGTTCGTCGTCG' +
        'TTTAAAACAACAATCAAATCACTTTCTTCGAAATGCTTAGCGACAACTTCATTAAAATATTTCAGCGATA' +
        'TATCTGACCCTCTATTTTGGACACTGAGATCCCCTTCTTGGTTAGCCAATGTATGATAACCCCCATCAAG' +
        'ATATACATTTACATCCGTTGGATCTGACCCAAAAGTTGGACAACACTCCGAGGCGTCAATTAAGCTCATG' +
        'ATACCGATGCTGTCATGACCAATGTAATAGAGATGGCCGTTTGACTGGAGACATGTTCCAGATAATTCTA' +
        'TCGCCTCTGCTATCTGAGCTGACTTAGAATAAACACTCCGACAGACAGCTTGATAGCCAGCAATTATGTT' +
        'AAATATCGAAGGCATCGTTAAAGAATTAAAACCTCCCAGAGACTGCAAAAGAGCTGGAATAAAAATGCTT' +
        'TCTAATATAATTTTTGTAATCGATCCACCTTTCATTCGACTTGAACCACAAATAGCTTCAGGCCCGACAA' +
        'TCGGGTTAATTAGAAAGGCCTTACCTTCTGCAACAACTGGAAGATATGATTTCATAACATCGTAAAAGCT' +
        'CTTCCCTCCCCATTTTTCGATGCTGGTTTTCCTTGACAGGTTGCTAGGATTAAACCCAATTAGAACCGGC' +
        'GTGTACTTTGTCAAATGCTTGATGCAATAGTCCAACTGTCCGGCCACGAACGGCGCTGAAAGTCCACAAG' +
        'TAATGCCTACATATAGTACTTGGCTTTTCTCCACCGTTGCTTTCTCCAGTAAATCCGCACCTAATTGAGG' +
        'ATCATCTTCGTAAAGTTCTTGCGAAGTAAACAGTGCTTCGTCCCCTCCAGCAATTATGTAACGGAAACAC' +
        'GGTTCATTCGATCCCGTTTCTTTCAGTCTGCTGTTCATGGCTCTAGCCAAGAGAAAGGCCAACCTCCCTG' +
        'ACGTACCGCAACCGGAGAGGACAACTGCACTTCGGACAGGGTCTTGCATGAGAGACGTCGCAAGTTGTTG' +
        'TACGGTAGCAATTGTATTCAGTACAACATCGCTGAAAACGTTTTGATCCTTGTATTTTCCCCAACCAGAA' +
        'AATATTTCTGAATCACATGATTCTAAGAGTTTCACTATTTCTTGAGGTGTTGACACATCAATGTTTGTTG' +
        'TAATTGGGTTTCTCCTTTCTGTTACTGGTTTCTCCATGATTCACACGTATTTCATTGAATGTTTAACATA' +
        'TGCTGCAGTAAAATATGACTCCACCCAACAAACGAACTCCCTCTTGATCAATGTGCCCGCCTTTATCAGA' +
        'AACCCGTTCCAAAGGTCACGAACAGTAAATTTCATAAACAAAAATCTATGTGGTGTAAGGGAGGTAACTG' +
        'CA';

    function createDNAHelix() {
        let svgContent = '';

        // Create two DNA strands
        const strand1Points = [];
        const strand2Points = [];

        // Calculate pattern dimensions using config
        const patternLength = dnaSequence.length;
        const repeats = Math.ceil(CONFIG.minScreenHeight / (patternLength * CONFIG.basePairSpacing));
        const totalBasePairs = patternLength * repeats;

        // Store pattern info for CSS animation
        window.dnaPatternLength = patternLength * CONFIG.basePairSpacing;

        // Generate helix backbone
        for (let i = 0; i <= totalBasePairs; i++) {
            const y = i * CONFIG.basePairSpacing;
            const angle1 = (i * CONFIG.helixTightness) % (2 * Math.PI);
            const angle2 = angle1 + Math.PI;

            const x1 = CONFIG.centerX + Math.cos(angle1) * CONFIG.helixRadius;
            const x2 = CONFIG.centerX + Math.cos(angle2) * CONFIG.helixRadius;

            strand1Points.push(`${x1},${y}`);
            strand2Points.push(`${x2},${y}`);
        }

        // Create backbone paths
        svgContent += `<path class="dna-backbone" d="M${strand1Points.join(' L')}" />`;
        svgContent += `<path class="dna-backbone" d="M${strand2Points.join(' L')}" />`;

        // Create base pairs
        for (let i = 0; i < totalBasePairs; i++) {
            const y = i * CONFIG.basePairSpacing;
            const angle1 = (i * CONFIG.helixTightness) % (2 * Math.PI);
            const angle2 = angle1 + Math.PI;

            const x1 = CONFIG.centerX + Math.cos(angle1) * CONFIG.helixRadius;
            const x2 = CONFIG.centerX + Math.cos(angle2) * CONFIG.helixRadius;

            const base = dnaSequence[i % dnaSequence.length];
            const complement = getComplement(base);

            // Base pair connection line
            svgContent += `<line class="base-pair ${base}" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" />`;

            // Base circles
            svgContent += `<circle class="base-pair ${base}" cx="${x1}" cy="${y}" r="${CONFIG.basePairRadius}" />`;
            svgContent += `<circle class="base-pair ${complement}" cx="${x2}" cy="${y}" r="${CONFIG.basePairRadius}" />`;

        }

        dnaContainer.innerHTML = svgContent;

        // Start animation with configurable delay
        setTimeout(() => {
            dnaContainer.classList.add('dna-animated');
        }, CONFIG.animationDelay);
    }

    function getComplement(base) {
        const complements = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G'};
        return complements[base] || 'A';
    }


    // Create FASTA header display
    function createFastaHeader() {
        const headerElement = document.createElement('div');
        headerElement.className = 'fasta-header';
        headerElement.textContent = fastaHeader;
        document.body.appendChild(headerElement);
    }

    // Update CSS animation duration dynamically
    function updateAnimationDuration() {
        const style = document.createElement('style');
        style.textContent = `
            .dna-animated {
                animation: dna-scroll ${CONFIG.animationDuration}s linear infinite;
            }
        `;
        document.head.appendChild(style);
    }

    // Update CSS stroke widths and colors dynamically
    function updateStrokeWidths() {
        const style = document.createElement('style');
        style.textContent = `
            .dna-helix .dna-backbone {
                stroke-width: ${CONFIG.backboneStrokeWidth};
            }
            .dna-helix .base-pair {
                stroke-width: ${CONFIG.basePairStrokeWidth};
            }
            .dna-helix .base-pair.A { stroke: ${CONFIG.baseColors.A}; fill: ${CONFIG.baseColors.A}; }
            .dna-helix .base-pair.T { stroke: ${CONFIG.baseColors.T}; fill: ${CONFIG.baseColors.T}; }
            .dna-helix .base-pair.G { stroke: ${CONFIG.baseColors.G}; fill: ${CONFIG.baseColors.G}; }
            .dna-helix .base-pair.C { stroke: ${CONFIG.baseColors.C}; fill: ${CONFIG.baseColors.C}; }
        `;
        document.head.appendChild(style);
    }

    // Initialize
    updateAnimationDuration();
    updateStrokeWidths();
    createDNAHelix();
    createFastaHeader();
});