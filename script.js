document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.getElementById('navbar');
    const navbarLinks = document.querySelectorAll('#navbar a');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navbar.classList.toggle('collapsed');
            navbar.querySelector('ul').classList.toggle('expanded');
        });
        
        // Close menu when a link is clicked on mobile
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbar.classList.add('collapsed');
                    navbar.querySelector('ul').classList.remove('expanded');
                }
            });
        });
        
        // Initialize navbar state as collapsed on mobile
        if (window.innerWidth <= 768) {
            navbar.classList.add('collapsed');
        }
        
        // Update navbar state on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                if (!navbar.classList.contains('collapsed')) {
                    navbar.classList.add('collapsed');
                    navbar.querySelector('ul').classList.remove('expanded');
                }
            } else {
                navbar.classList.remove('collapsed');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Sticky navigation on scroll
    const navbarOffset = navbar.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= navbarOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    // Simple NLP Demo functionality
    const demoInput = document.getElementById('nlp-demo-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const demoResults = document.getElementById('nlp-demo-results');
    
    analyzeBtn.addEventListener('click', function() {
        const text = demoInput.value.trim();
        
        if (text === '') {
            demoResults.innerHTML = '<p class="error">Please enter some text to analyze.</p>';
            return;
        }
        
        // Perform simple NLP analysis
        const analysis = analyzeText(text);
        
        // Display results
        displayAnalysisResults(analysis);
    });
    
    function analyzeText(text) {
        // This is a simplified demonstration of NLP concepts
        // In a real application, you would use a proper NLP library
        
        const analysis = {
            tokenization: tokenize(text),
            wordCount: countWords(text),
            characterCount: text.length,
            sentenceCount: countSentences(text),
            sentiment: analyzeSentiment(text),
            namedEntities: findNamedEntities(text),
            topWords: findTopWords(text)
        };
        
        return analysis;
    }
    
    function tokenize(text) {
        // Simple tokenization (splitting by spaces and punctuation)
        return text.toLowerCase()
                  .replace(/[^\w\s']|_/g, " ")
                  .replace(/\s+/g, " ")
                  .trim()
                  .split(" ");
    }
    
    function countWords(text) {
        return tokenize(text).length;
    }
    
    function countSentences(text) {
        // Simple sentence counting (splitting by .!?)
        return text.split(/[.!?]+/).filter(Boolean).length;
    }
    
    function analyzeSentiment(text) {
        // Extremely simplified sentiment analysis
        // Just checking for presence of positive/negative words
        
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'happy', 'best', 'wonderful', 'awesome', 'fantastic'];
        const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'worst', 'poor', 'disappoint', 'negative', 'failure'];
        
        const tokens = tokenize(text);
        let positiveCount = 0;
        let negativeCount = 0;
        
        tokens.forEach(token => {
            if (positiveWords.includes(token)) positiveCount++;
            if (negativeWords.includes(token)) negativeCount++;
        });
        
        if (positiveCount > negativeCount) {
            return { label: 'Positive', score: Math.min(0.5 + (positiveCount - negativeCount) * 0.1, 0.9) };
        } else if (negativeCount > positiveCount) {
            return { label: 'Negative', score: Math.min(0.5 + (negativeCount - positiveCount) * 0.1, 0.9) };
        } else {
            return { label: 'Neutral', score: 0.5 };
        }
    }
    
    function findNamedEntities(text) {
        // Extremely simplified named entity recognition
        // Just looking for capitalized words not at the start of sentences
        
        const entities = [];
        const words = text.split(/\s+/);
        
        for (let i = 0; i < words.length; i++) {
            let word = words[i].replace(/[^\w]/g, '');
            
            // If word starts with capital and isn't at the beginning of a sentence
            if (word.length > 0 && 
                word[0] === word[0].toUpperCase() && 
                word[0] !== word[0].toLowerCase() &&
                (i !== 0 && !words[i-1].match(/[.!?]$/))) {
                
                entities.push(word);
            }
        }
        
        return entities;
    }
    
    function findTopWords(text) {
        const tokens = tokenize(text);
        const stopWords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 
                         'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 
                         'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 
                         'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 
                         'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 
                         'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 
                         'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 
                         'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 
                         'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 
                         'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 
                         'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 
                         'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'don\'t', 'should', 
                         'should\'ve', 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', 'aren\'t', 
                         'couldn', 'couldn\'t', 'didn', 'didn\'t', 'doesn', 'doesn\'t', 'hadn', 'hadn\'t', 
                         'hasn', 'hasn\'t', 'haven', 'haven\'t', 'isn', 'isn\'t', 'ma', 'mightn', 'mightn\'t', 
                         'mustn', 'mustn\'t', 'needn', 'needn\'t', 'shan', 'shan\'t', 'shouldn', 'shouldn\'t', 
                         'wasn', 'wasn\'t', 'weren', 'weren\'t', 'won', 'won\'t', 'wouldn', 'wouldn\'t'];
        
        // Filter out stop words
        const filteredTokens = tokens.filter(token => !stopWords.includes(token) && token.length > 1);
        
        // Count word frequencies
        const wordCounts = {};
        filteredTokens.forEach(token => {
            wordCounts[token] = (wordCounts[token] || 0) + 1;
        });
        
        // Convert to array for sorting
        const wordCountArray = Object.entries(wordCounts);
        
        // Sort by frequency
        wordCountArray.sort((a, b) => b[1] - a[1]);
        
        // Take top 5 or less
        return wordCountArray.slice(0, 5);
    }
    
    function displayAnalysisResults(analysis) {
        let resultsHTML = '<h4>Text Analysis Results:</h4>';
        
        // Basic stats
        resultsHTML += `<p><strong>Word count:</strong> ${analysis.wordCount}</p>`;
        resultsHTML += `<p><strong>Character count:</strong> ${analysis.characterCount}</p>`;
        resultsHTML += `<p><strong>Sentence count:</strong> ${analysis.sentenceCount}</p>`;
        
        // Sentiment
        resultsHTML += `<p><strong>Sentiment:</strong> ${analysis.sentiment.label} (${Math.round(analysis.sentiment.score * 100)}% confidence)</p>`;
        
        // Tokens
        if (analysis.tokenization.length > 0) {
            const displayTokens = analysis.tokenization.slice(0, 10); // Show first 10 tokens
            resultsHTML += `<p><strong>Tokenization (first 10):</strong> ${displayTokens.join(', ')}${analysis.tokenization.length > 10 ? '...' : ''}</p>`;
        }
        
        // Named entities
        if (analysis.namedEntities.length > 0) {
            resultsHTML += `<p><strong>Potential named entities:</strong> ${analysis.namedEntities.join(', ')}</p>`;
        }
        
        // Top words
        if (analysis.topWords.length > 0) {
            resultsHTML += '<p><strong>Most frequent words:</strong></p>';
            resultsHTML += '<ul>';
            analysis.topWords.forEach(word => {
                resultsHTML += `<li>${word[0]}: ${word[1]} occurrences</li>`;
            });
            resultsHTML += '</ul>';
        }
        
        demoResults.innerHTML = resultsHTML;
    }
}); 