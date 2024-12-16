function myFunction() {
    // Toggle the navigation menu for small screens
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Add an event listener to the "People" link
document.getElementById("People").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link behavior

    // Get a reference to the container div
    var container = document.getElementById("content");

    // Remove the existing content
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    // Create and append the new div
    var newDiv = document.createElement("div");
    newDiv.id = "profileDiv"
    // newDiv.textContent = "New content for People link.";

    // Usage
    loadCSVAndReplaceDiv('./data.csv', "profileDiv");
    
    container.appendChild(newDiv);
});

function createNewRow() {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row'; // Add your desired CSS class for "row" here
    return rowDiv;
}

// Function to load and process the CSV file
function loadCSVAndReplaceDiv(csvFilePath, targetDivId) {
    // Load the CSV file using XMLHttpRequest or fetch API
    fetch(csvFilePath)
        .then(response => response.text())
        .then(csvData => {
            // Parse the CSV data
            const rows = csvData.split('\n');
            // Create a container div for the book-like format
        const bookContainer = document.createElement('div');
        bookContainer.className = 'book-container'; // Optional: Add a CSS class for styling

        // Extract column indexes based on column names
        const columnHeader = rows[0].split(',');
        const NameIdx = columnHeader.indexOf("Name");
        const imageIndex = columnHeader.indexOf("Photo");
        const roleIndex = columnHeader.indexOf("Role");
        const departmentIndex = columnHeader.indexOf("Department");
        const emailIndex = columnHeader.indexOf("EmailId");
        const areasOfInterestIndex = columnHeader.indexOf("AreasOfInterest");
        // const areasOfInterestIndex = columnHeader.length-1;

        let currentRow = createNewRow();
        bookContainer.appendChild(currentRow);
        let personCounter = 0;
        
        for (let i = 1; i < rows.length; i++) {
                const columns = rows[i].split(',');
                if (columns.length > -1) {
                    const name = columns[NameIdx];
                    const department = columns[departmentIndex];
                    const email = columns[emailIndex+5];
                    // const profileLink = columns[profileLinkIndex];
                    const imageName = columns[imageIndex];
                    const role = columns[roleIndex];
                    //const areasOfInterest = columns[areasOfInterestIndex];
                
                    // Create a div for each person's information
                    const personImage = document.createElement('div');
                    personImage.className = 'person-image'; // Apply the CSS class for styling

                    // Create an image element
                    const imageElement = document.createElement('img');
                    // Add the "profileimages/" prefix to the image source
                    const imageSrc = `profilephotos/${imageName}`;
                    imageElement.src = imageSrc;

                    // Append the image element to the .person-image element
                    personImage.appendChild(imageElement);

                    // Create a .person <div> element
                    const personDiv = document.createElement('div');
                    personDiv.className = 'person'; // Apply the CSS class for styling

                    // Append the .person-image element to the .person <div>
                    personDiv.appendChild(personImage);

                    
                    // Create elements for name, department, email, and profile link
                    const nameElement = document.createElement('p');
                    nameElement.textContent = name;
                    nameElement.classList.add('name'); // Add the 'name' class for bold styling
                    personDiv.appendChild(nameElement);

                    const roleElement = document.createElement('p');
                    roleElement.textContent = role;
                    personDiv.appendChild(roleElement);
                    
                    const departmentElement = document.createElement('p');
                    departmentElement.textContent = department;
                    personDiv.appendChild(departmentElement);
                    
                    // const areasElement = document.createElement('p');
                    // areasElement.textContent = areasOfInterest;
                    // personDiv.appendChild(areasElement);

                    const emailElement = document.createElement('p');
                    const emailLink = document.createElement('a');
                    emailLink.href = `mailto:${email}`; // Create a mailto link
                    emailLink.classList.add('email'); // Add the 'email' class for styling

                    // Create a span element for the default email icon
                    const emailIcon = document.createElement('span');
                    emailIcon.innerHTML = '&#9993;'; // HTML entity code for the envelope icon

                    emailLink.appendChild(emailIcon); // Add the email icon inside the anchor
                    emailElement.appendChild(emailLink); // Add the anchor with the icon to the paragraph
                    personDiv.appendChild(emailElement);

                    // // Create a link for the profile
                    // const profileLinkElement = document.createElement('a');
                    // profileLinkElement.href = profileLink;
                    // profileLinkElement.textContent = 'Profile Link';
                    // personDiv.appendChild(profileLinkElement);
                    
                    // Append the person's div to the book container
                    if (i==1){
                        currentRow.appendChild(personDiv);
                        bookContainer.appendChild(currentRow);
                        currentRow = createNewRow();
                    }
                    else{
                        currentRow.appendChild(personDiv);
                        personCounter++;
                    }
                    
                    
                    if (personCounter % 3 === 0) {
                        // Create a new "row" div and append it to the body
                        bookContainer.appendChild(currentRow);
                        if (i != rows.length-1) {
                            currentRow = createNewRow();
                        }
                    }
                    
                }
                if (personCounter % 3 !== 0) {
                    bookContainer.appendChild(currentRow);
                }
        }
            // const table = document.createElement('table');
    
            // for (let i = 0; i < rows.length; i++) {
            // const row = document.createElement('tr');
            // const columns = rows[i].split(',');
            
            // for (let j = 0; j < columns.length; j++) {
            //     const cell = i === 0 ? document.createElement('th') : document.createElement('td');
            //     cell.textContent = columns[j];
            //     row.appendChild(cell);
            // }
            
            // table.appendChild(row);
            // }
    
        // Create a new div with the table
        const newDiv = document.createElement('div');
        newDiv.appendChild(bookContainer);

        // Replace the existing div with the new div
        const targetDiv = document.getElementById(targetDivId);
        if (targetDiv) {
        targetDiv.parentNode.replaceChild(newDiv, targetDiv);
        } else {
        console.error('Target div not found.');
        }
        })
        .catch(error => {
            console.error('Error loading or processing the CSV file:', error);
        });
        var navLinks = document.querySelectorAll(".topnav a");
        navLinks.forEach(function (link) {
            link.classList.remove("active");
        });
        var activeLink = document.querySelector(".topnav a[href='#People']");
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }
  
  

function loadContent(page) {
    // Define the content for each page
    var contentMap = {
        'home': '<body> <div class="gap-bar"></div> <main class="container content" style="height: 120vh;"> <div id="divContent" class="oval-div"> <div class="divMainContent"> <h1>SCaLAR >>> Design ... Develop ... Deploy >>> Solutions for Social Media Applications</h1> <p><span style="font-style: oblique; font-weight: bold;">SCaLAR </span> is an applied research group in the <a href="http://infotech.nitk.ac.in/" target="_blank"> <span style="text-decoration: underline; font-weight: bold;">Department of Information Technology</span> </a> at the <a href="https://www.nitk.ac.in/" target="_blank"> <span style="text-decoration: underline; font-weight: bold;">National Institute of Technology Karnataka, Surathkal</span> </a>. Our team works primarily with social media with a focus on Indian Languages with applications ranging from text analysis, summarization, translation and many more. For further details please check our <a href="#" target="_blank"> <span style="text-decoration: underline; font-weight: bold;">Products &amp; Services</span> </a> page for our speciality offerings on data and consultancy services. We are also involved in the latest research on language models which range from finetuning embedding models for Indian Languages to leveraging Large Language Models &LeftAngleBracket; LLMs &RightAngleBracket;, check out our <a href="#" target="_blank"> <span style="text-decoration: underline; font-weight: bold;">Research</span> </a> page for details on our latest publications. Apart from linguistic tools and services we also have expertise in Recommendation Systems and Geospatial Data Analysis, for further information on our expertise visit our <a href="#" target="_blank"> <span style="text-decoration: underline; font-weight: bold;">People</span> </a> page. The latest activities of the SCaLAR group can be found as a snapshot on the homepage and in detail on the <a href="#" target="_blank"> <span style="text-decoration: underline; font-weight: bold;">New @ SCaLAR</span> </a> page. </p> </div> </div> </main></body>',

        
        'people': '<h2>Meet Our Team</h2><p>Information about the team goes here.</p>',

        'projects': '<body> <div class="layout"> <div class="publication"> <br> <h2 style="color: #386d5a">Projects</h2> <p style="margin-left: 40px; margin-right: 40px;"> <a href="#sponsored" style="color: black;">Sponsored Projects <i class="fa fa-link"></i></span></a><br/> <a href="#significant" style="color: black;">Significant Projects <i class="fa fa-link"></i></span></a><br/> <a href="#consultancy" style="color: black;">Consultancy Work <i class="fa fa-link"></i></span></a> </p> <br> <div class="box"> <h2 id="sponsored" style="text-align: center; color: #386d5a;">Sponsored Projects</h2> <div class="item"> <ul> <li>"Computing Tools for Tamil Language Teaching and Learning" (Principal Investigator), Project Cost- 20 Lakhs, funded by Tamil Virtual Academy (Govt-of-Tamilnadu) in 2017-2018.</li> <li>Malayalam Wordnet (Co-Investigator), Project Cost - 32 Lakhs, funded by Diety, Govt of INDIA in 2014.</li> </ul> </div> </div> <br> <div class="box"> <h2 id="significant" style="text-align: center; color: #386d5a;">Significant Projects</h2> <div class="item"> <ul> <li>Hate Speech detection Code-Mixed Corpora for Tamil</li> <li>Developed POS-Tagger and Chunker for Tamil.</li> <li>Introduced a Novel method for Morphological Analyzer using Machine Learning (Tamil, Malayalam, Kannada, and Telugu).</li> <li>Morphological Generator for Tamil, Malayalam and Telugu.</li> <li>Verb Conjugator for Tamil.</li> <li>Dependency Parser for Tamil.</li> <li>Morphology-based Statistical Machine Translation for English to Tamil.</li> <li>Code-Mixed POS Tagger for Indian Languages.</li> <li>NER for Tamil Social media Text</li> <li>Paraphrase Detection corpora created for (Tamil, Malayalam, Hindi and Punjabi)</li> <li>Multistage abstractive summarization of Indian legal documents</li> <li>Attribute-value prediction for E-commerce product descriptions</li> </ul> </div> </div> <br> <div class="box"> <h2 id="consultancy" style="text-align: center; color: #386d5a;">Consultancy Work</h2> <div class="item"> <ul> <li>"Structured content extraction from preformatted documents and study materials", Rs. 1.18 Lakhs, Edumeister (US), 2020</li> <li>"Subtitle Translation System" , Rs. 4.4 Lakhs, Sharp Software Development,, 2014</li> <li>Named Entity Recognition for Tamil and Paraphrase Identification for Tamil, Rs. 1.2 Lakhs, CLTP-Srilanka, 2017</li> </ul> </div> </div> </div> </div> <script> window.onscroll = function() { // Add a function to handle scroll events var topnav = document.getElementById("myTopnav"); if (window.pageYOffset > 0) { // Adjust the scroll position as needed topnav.classList.add("sticky"); } else { topnav.classList.remove("sticky"); } }; function myFunction() { var x = document.getElementById("myTopnav"); if (x.className === "topnav") { x.className += " responsive"; } else { x.className = "topnav"; } } </script></body>',


        'publications': '<body> <div class="layout"> <div class="publication"> <br> <h2 style="color: #386d5a">Publications</h2> <p style="margin-left: 40px; margin-right: 40px;"> <a href="#journal" style="color: black;">Journal Publications <i class="fa fa-link"></i></a><br/> <a href="#conference" style="color: black;">Conference Publications <i class="fa fa-link"></i></a><br/> <a href="#books-edited" style="color: black;">Journal Special Issues/Books Edited <i class="fa fa-link"></i></a><br/> <a href="#book-chapters" style="color: black;">Book Chapters <i class="fa fa-link"></i></span></a><br/> </p> <br> <div class="box"> <h2 id="journal" style="text-align: center; color: #386d5a;">Journal Publications</h2> <div class="item"> <ul> <li>Niyas, S., Pawan, S.J., Anand Kumar, M., Rajan, J. Medical image segmentation with 3D convolutional neural networks: A survey, (2022) Neurocomputing, 493, pp. 397-413.</li> <li>Anand Kumar, M., Padannayil, S.K. Transfer learning based code-mixed part-of-speech tagging using character-level representations for Indian languages (2021) Journal of Ambient Intelligence and Humanized Computing.</li> <li>Mehta, D., Dwivedi, A., Patra, A., Anand Kumar, M.A transformer-based architecture for fake news classification. Springer- Soc. Netw. Anal. Min. 11, 39 (2021). https://doi.org/10.1007/s13278-021-00738-y</li> <li>Meshram, S., Anand Kumar, M. Long short-term memory network for learning sentences similarity using deep contextual embeddings. Springer - Int. j. inf. tecnol. (2021). https://doi.org/10.1007/s41870-021-00686-y.</li> <li>Radarapu, R., Gopal, A.S.S., Nh, M., Anand Kumar, M.Video summarization and captioning using dynamic mode decomposition for surveillance. Springer Int. j. inf. tecnol. (2021). https://doi.org/10.1007/s41870-021-00668-0</li> <li> Sanjanasri, J.P., Anand Kumar, M., Soman, K.P. Deep learning-based techniques to enhance the precision of phrase-based statistical machine translation system for Indian languages (2020) International Journal of Computer Aided Engineering and Technology, Inderscience- 13 (1-2), pp. 239-257</li> <li>Manjusha, M. Anand Kumar, K.P. Soman, On developing handwritten character image database for Malayalam language script, Engineering Science and Technology - Elsevier (IF: 4.36), an International Journal, Volume 22, Issue 2, 2019, Pages 637-645.</li> <li>M. Anand Kumar, Premjith, B., Singh, Shivkaran, Rajendran, S. and Soman, K. P.. "An Overview of the Shared Task on Machine Translation in Indian Languages (MTIL) – 2017" Journal of Intelligent Systems, vol. 28, no. 3, 2019, pp. 455-464. https://doi.org/10.1515/jisys-2018-0024</li> <li>Veena, P.V., Kumar, M.A., Soman, K.P. Character embedding for language identification in Hindi-English code-mixed social media text (2018) Computacion y Sistemas, 22 (1), pp. 65-74. DOI: https://doi.org/10.13053/CyS-22-1-2775 (Scopus & ESCI)</li> <li>Manjusha, K., Anand Kumar, M., Soman, K.P. Integrating scattering feature maps with convolutional neural networks for Malayalam handwritten character recognition (2018) International Journal on Document Analysis and Recognition, pp. 1-12. Article in Press. DOI: https://doi.org/10.1007/s10032-018-0308-z(SCI, IF:1.29)</li> <li>Kumar, S., Kumar, M.A., Soman, K.P. Deep Learning Based Part-of-Speech Tagging for Malayalam Twitter Data (Special Issue: Deep Learning Techniques for Natural Language Processing) (2018) Journal of Intelligent Systems, . Article in Press. DOI: https://doi.org/10.1515/jisys-2017-0520 (SCOPUS and ESCI)</li> <li>Singh, S., Anand Kumar, M., Soman, K.P. Attention based English to Punjabi neural machine translation (2018) Journal of Intelligent and Fuzzy Systems, 34 (3), pp. 1551-1559. DOI: https://doi.org/10.3233/JIFS-169450(SCI, IF:1.426)</li> <li>Manjusha, K.,Anand Kumar, M., Soman, K.P. Reduced Scattering Representation for Malayalam Character Recognition (2018) Arabian Journal for Science and Engineering, 43 (8), pp. 4315-4326. DOI: https://doi.org/10.1007/s13369-017-2945-9(SCI, IF:1.02)</li> <li>Remmiya Devi, G., Anand Kumar, M., Soman, K.P. Co-occurrence based word representation for extracting named entities in Tamil tweets (2018) Journal of Intelligent and Fuzzy Systems, 34 (3), pp. 1435-1442. DOI: https://doi.org/10.3233/JIFS-169439(SCI, IF:1.426)</li> <li>Manjusha, K., Anand Kumar, M., Soman, K.P. Implementation of rejection strategies inside malayalam character recognition system based on random fourier features and regularized least square classifier (2018) Journal of Engineering Science and Technology, 13 (1), pp. 141-157.</li> <li>Sooraj, S., Manjusha, K., Anand Kumar, M., Soman, K.P. Deep learning based spell checker for Malayalam language (2018) Journal of Intelligent and Fuzzy Systems, 34 (3), pp. 1427-1434. DOI: https://doi.org/10.3233/JIFS-169438(SCI, IF:1.426)</li> </ul> </div> </div> <br> <div class="box"> <h2 id="conference" style="text-align: center; color: #386d5a;">Conference Publications</h2> <div class="item"> <ul> <li>Velingkar, G., Kumar, J.K., Varadarajan, R., Lanka, S., Anand Kumar, M. Task Scheduling Using Deep Q-Learning (2022) Lecture Notes in Electrical Engineering, 858, pp. 749-759.</li> <li>Prajwal, K., Tharun, K., Navaneeth, P., Anand Kumar, M. Cardiovascular Disease Prediction, Using Machine Learning (2022) 2022 International Conference on Innovative Trends in Information Technology, -Indian Institute of Information Technology Kottayam ICITIIT 2022</li> <li>Saldanha, R., Ananthanarayana, V.S., Anand Kumar, M., Krishnamurthy, P. NITK-UoH: Tamil-Telugu Machine Translation Systems for the WMT21 Similar Language Translation Task (2021) WMT 2021 - 6th Conference on Machine Translation, Proceedings, pp. 299-303.</li> <li>Nayak, P., Dash, A., Chintawar, S., Anand Kumar, M. Multi-Level Statistical Model for Forecasting Solar Radiation (2022) 2022 International Conference on Innovative Trends in Information Technology, Indian Institute of Information Technology Kottayam ICITIIT 2022</li> <li>Nayak, P., Praueeth, G., Kulkarni, R., Anand Kumar, M. Long Short Term Memory Networks for Lexical Normalization of Tweets (2021) 2021 12th International Conference on Computing Communication and Networking Technologies, IIT - Kharagpur, ICCCNT 2021</li> <li>Surendran, P., Navyasree, B., Kambham, H., Anand Kumar, M. Covid-19 Fake News Detector using Hybrid Convolutional and Bi-LSTM Model (2021) 2021 12th International Conference on Computing Communication and Networking Technologies, IIT - Kharagpur, ICCCNT 2021</li> <li>Mangukia, A., Ibrahim, M., Golamudi, S., Kumar, N., Anand Kumar, M. Improved Variable Round Robin Scheduling Algorithm (2021) 2021 12th International Conference on Computing Communication and Networking Technologies, IIT - Kharagpur, ICCCNT 2021,</li> <li>Gorti, S.S., Khalifa, A., Thirunavukkarasan, H., Nisha, G., Anand Kumar, M. Smart Traffic Management System Using Multithreading and Inter-process Communication (2021) 2021 12th International Conference on Computing Communication and Networking Technologies, IIT - Kharagpur, ICCCNT 2021</li> <li>Hariharan. R.L, &, Anand Kumar M. (2021). NITK _ NLP at CheckThat! 2021: Ensemble Transformer Model for Fake News Classification. International Conference of the Cross-Language Evaluation Forum for European Languages - September 2021, (CLEF 2021)</li> <li>Ahmed, S. S., & Anand Kumar, M. (2021). Classification of Censored Tweets in Chinese Language using XLNet. In Proceedings of the Fourth Workshop on NLP for Internet Freedom: Censorship, Disinformation, and Propaganda (pp. 136-139), NAACL 2021</li> <li>Hariharan, R. L. Anand Kumar M, "NITK NLP at FinCausal-2020 Task 1 Using BERT and Linear models." In Proceedings of the 1st Joint Workshop on Financial Narrative Processing and MultiLing Financial Summarisation, ACL pp. 60-63. 2020</li> <li>Madhusoodanan, Adithya, Kieran Fraser, and Bilal Yousuf. Anand Kumar M, "Machine Learning Approach to Manage Adaptive Push Notifications for Improving User Experience." Challenge (2020): MobiQuitous ’20, December 7–9, 2020, Darmstadt, Germany 2020, Association for Computing Machinery</li> <li>Chakravarthi, Bharathi Raja, Ruba Priyadharshini, Navya Jose, Anand Kumar M , Thomas Mandl, Prasanna Kumar Kumaresan, Rahul Ponnusamy, R. L. Hariharan, John Philip McCrae, and Elizabeth Sherly. "Findings of the Shared Task on Offensive Language Identification...</li> <li>Chakravarthi, Bharathi Raja, Ruba Priyadharshini, Shubhanker Banerjee, Richard Saldanha, John Philip McCrae, Anand Kumar M, "Findings of the Shared Task on Machine Translation in Dravidian languages."</li> <li>Anand Kumar M, NITK-IT NLP@NSURL2019: Transfer Learning based POS Tagger for Under Resourced Bhojpuri and Magahi Language, NSURL Workshop on NLP Solutions for Under Resourced Languages, Italy - Sept 2019</li> <li>Agrawal, Anumeha, Rosa Anil George, Selvan Sunitha Ravi, Sowmya Kamath. Anand Kumar M "Leveraging Multimodal Behavioral Analytics for Automated Job Interview Performance Assessment and Feedback." ACL 2020 (2020)</li> <li>Bhavya Bordia, Shaswat Patel, N Nishanth, Anand Kumar M and Bhawana Rudra, Automated Traffic Light Signal Violation Detection System using Convolutional Neural Network, Springer 2020, SocTA</li> <li>JP Sanjanasri, VK Menon, S Rajendran, KP Soman, M Anand Kumar, Intrinsic Evaluation for English–Tamil Bilingual Word Embeddings, Springer-Intelligent Systems, Technologies and Applications, 39-51, 2020.</li> <li>Agrawal, A., George, R.A., Ravi, S.S., Kamath, S. and Kumar, A., 2019, August. Ars_nitk at mediqa 2019: analysing various methods for natural language inference, recognising question entailment and medical question answering system...</li> <li>SS Kumar, M Anand Kumar, KP Soman, P Poornachandran, Dynamic Mode-Based Feature with Random Mapping for Sentiment Analysis, Springer-Intelligent Systems, Technologies and Applications, 1-15, 2020.</li> <li>Barathi Ganesh HB, Soman KP, Reshma U, Mandar K, Prachi M, Gouri K, Anitha K, Anand Kumar M, Overview of arnekt iecsil at fire-2018 track on information extraction for conversational systems in indian languages. FIRE (Working Notes)- 2018.</li> <li>Anand Kumar, M., & BGB, P. SK: Overview of the INLI@ FIRE-2018 Track on Indian Native Language Identification. In workshop proceedings of FIRE (pp. 6-9)-2018.</li> <li>Sharmila Devi V, S. Kannimuthu, Ravikumar G, Anand Kumar M, KCE_DAlab@MAPonSMS-FIRE2018: Effective word and character-based features for Multilingual Author Profiling. 213-222, In workshop proceedings of FIRE (pp. 6-9).</li> <li>Anand Kumar M, Barathi Ganesh H. B., Soman K. P, Ajay S. G: Indian Native Language Identification - INLI 2018. ACM Proceedings, FIRE 2018, 11-15</li> <li>Barathi Ganesh H. B., Soman K. P, Reshma U, Mandar Kale, Prachi Mankame, Gouri Kulkarni, Anitha Kale, Anand Kumar M, Information Extraction for Conversational Systems in Indian Languages - Arnekt IECSIL. ACM Proceedings, FIRE 2018: 18-20</li> <li>Anand Kumar, M., Singh, S., Kavirajan, B., Soman, K.P. Shared Task on Detecting Paraphrases in Indian Languages (DPIL): An Overview (2018) Lecture Notes in Computer Science (including subseries Lecture Notes in Artificial Intelligence and Lecture Notes in Bioinformatics), 10478 LNCS, pp. 128-140. DOI: 10.1007/978-3-319-73606-8_10</li> <li>Barathi Ganesh, H.B., Reshma, U., Anand Kumar, M., Soman, K.P. From Vector Space Models to Vector Space Models of Semantics (2018) Lecture Notes in Computer Science (including subseries Lecture Notes in Artificial Intelligence and Lecture Notes in Bioinformatics), 10478 LNCS, pp. 50-60. DOI: 10.1007/978-3-319-73606-8_4</li> <li>Premjith, B., Soman, K.P., Kumar, M.A. A deep learning approach for Malayalam morphological analysis at character level (2018) Procedia Computer Science, 132, pp. 47-54. DOI: 10.1016/j.procs.2018.05.058</li> <li>Remmiya Devi, G., Veena, P.V., Anand Kumar, M., Soman, K.P. Entity Extraction of Hindi-English and Tamil-English Code-Mixed Social Media Text (2018) Lecture Notes in Computer Science (including subseries Lecture Notes in Artificial Intelligence and Lecture Notes in Bioinformatics), 10478 LNCS, pp. 206-218. DOI: 10.1007/978-3-319-73606-8_16</li> <li>Praveena, R., Anand Kumar, M., Soman, K.P. Chunking based malayalam araphrase identification using unfolding recursive autoencoders (2017) 2017 international Conference on Advances in Computing, Communications and Informatics, ICACCI 2017, 2017-January, pp. 922-928. DOI: 10.1109/ICACCI.2017.8125959</li> <li>Veena, P.V., Anand Kumar, M., Soman, K.P. An effective way of word-level language identification for code-mixed facebook comments using word-embedding via character-embedding (2017) 2017 International Conference on Advances in Computing, Communications and Informatics, ICACCI 2017, 2017-January, pp. 1552-1556. DOI:10.1109/ICACCI.2017.8126062 (Received Best Paper Award)</li> <li>Srinidhi Skanda, V., Anand Kumar, M., Soman, K.P. Detecting stance in kannada social media code-mixed text using sentence embedding (2017) 2017 international Conference on Advances in Computing, Communications and Informatics, ICACCI 2017, 2017-January, pp. 964-969. DOI: 10.1109/ICACCI.2017.8125966</li> <li>Kavirajan, B., Anand Kumar, M., Soman, K.P., Rajendran, S., Vaithehi, S. Improving the rule based machine translation system using sentence simplification (English to Tamil) (2017) 2017 International Conference on Advances in Computing, Communications and Informatics, ICACCI 2017, 2017-January, pp. 957-963. DOI: 10.1109/ICACCI.2017.8125965</li> <li>Sankaralingam, C., Rajendran, S., Kavirajan, B., Anand Kumar, M., Soman, K.P. Onto-thesaurus for Tamil language: Ontology based intelligent system for information retrieval(2017) 2017 International Conference on Advances in Computing, Communications and Informatics, ICACCI 2017, 2017-January, pp. 2396-2401. DOI: 10.1109/ICACCI.2017.8126206</li> <li>Manjusha, K., Kumar, M.A., Soman, K.P. Scattering representation in Malayalam character recognition (2017) 2017 23rd National Conference on Communications, NCC 2017, art. no. 8077089, DOI: 10.1109/NCC.2017.8077089</li> <li>Barathi Ganesh, H.B., Reshma, U., Anand Kumar, M., Soman, K.P. Distributed representation in information retrieval - AMRITA-CEN-NLP@IRLeD2017 (2017) CEUR Workshop Proceedings, 2036, pp. 69-71.</li> <li>Balakrishnan, B.G.H., Vinayakumar, Anand Kumar, M, Padannayil, S.K. NLP CEN AMRITA SMM4H: Health care text classification through class embeddings (2017) CEUR Workshop Proceedings, 1996, pp. 79-82.</li> <li>Sharmila Devi, V., Kannimuthu, S., Safeeq, G., Anand Kumar, M. KCEDAlab @ EventXtract-IL-FIRE2017: Event Extraction using Support Vector Machines (2017) CEUR Workshop Proceedings, 2036, pp. 144-146.</li> <li>Kumar, S.S., Kumar, M.A., Soman, K.P. Sentiment analysis of tweets in malayalam using long short-term memory units and convolutional neural nets, (2017) Lecture Notes in Computer Science (including subseries Lecture Notes in Artificial Intelligence and Lecture Notes in Bioinformatics), 10682 LNAI, pp. 320-334.DOI: 10.1007/978-3-319-71928-3_31</li> <li>Barathi Ganesh, H.B., Reshma, U., Anand Kumar, M., Soman, K.P. Representation of target classes for text classification - AMRITA-CEN-NLP@RusProfilingPAN 2017 (2017) CEUR Workshop Proceedings, 2036, pp. 25-27.</li> <li>Vinayan, V., Naveen, J.R., Harikrishnan, N.B., Anand Kumar, M., Soman, K.P. AmritaNLP@PAN-RusProfiling: Author Profiling using Machine Learning Techniques (2017) CEUR Workshop Proceedings, 2036, pp. 8-12.</li> <li>Anand Kumar, M., Barathi Ganesh, H.B., Singh, S., Soman, K.P., Rosso, P. Overview of the INLI PAN at FIRE-2017 track on Indian native language identification (2017) CEUR Workshop Proceedings, 2036, pp. 99-105.</li> </ul> </div> </div> <br> <div class="box"> <h2 id="books-edited" style="text-align: center; color: #386d5a;">Journal Special Issues/Books Edited</h2> <div class="item"> <ul> <li>Edited a special issue titled "Deep Learning Techniques for Natural Language Processing" in the Journal of Intelligent Systems (Scopus Indexed) - Jul-2019 issue</li> <li>Edited ICCIDS-2020 - conference proceedings - published in the Springer IFIP AICT (Advances in Information and Communication Technology ) series.</li> </ul> </div> </div> <br> <div class="box"> <h2 id="book-chapters" style="text-align: center; color: #386d5a;">Books Chapters</h2> <div class="item"> <ul> <li>Shubham Agrawal, Rashad Ahmed, Anand Kumar, M., Sheela Ramanna Categorizing Relations via Semi-supervised Learning Using a Hybrid Tolerance Rough Sets and Genetic Algorithm Approach (2022) Studies in Fuzziness and Soft Computing, 413, pp. 103-116.</li> <li>Praveena, R., Anand Kumar, M., Soman, K.P. Semantic Similarity and Paraphrase Identification for Malayalam Using Deep Autoencoders (2021) Signals and Communication Technology, pp. 81-96.</li> <li>Rajendran, S., Soman, K.P., Anand Kumar, M., Sankaralingam, C. Ontological Structure-Based Retrieval System for Tamil (2021) EAI/Springer Innovations in Communication and Computing, pp. 197-223.</li> <li>Ganesh, H. B., Reshma, U., Soman, K. P., &Kumar, M. A. (2020). MedNLU: Natural Language Understander for Medical Texts. In Deep Learning Techniques for Biomedical and Health Informatics (pp. 3-21). Springer, Cham.</li> <li>Devi, G. R.,Kumar, M. A., & Soman, K. P. (2020). Extraction of named entities from social media text in tamil language using N-gram embedding for disaster management. In Nature-Inspired Computation in Data Mining and Machine Learning (pp. 207-223). Springer, Cham.</li> <li>Ratnam, D.J., Kumar, M.A., Premjith, B., Soman, K.P., Rajendran, S. Sense disambiguation of English simple prepositions in the context of English-Hindi machine translation system (2018) Springer, Knowledge Computing and Its Applications: Knowledge Manipulation and Processing Techniques: Volume 1, pp. 245-268 (SPRINGER Book Chapter)</li> <li>Premjith B., Soman K.P., Anand Kumar M., Jyothi Ratnam D. (2019) Embedding Linguistic Features in Word Embedding for Preposition Sense Disambiguation in English—Malayalam Machine Translation Context.Recent Advances in Computational Intelligence. Studies in Computational Intelligence, vol 823. Springer, Cham</li> <li>Anand Kumar M, Shivkaran Singh , Praveena Ramanan , Vaithehi Sinthiya and Soman K. P Creating Paraphrase Identification Corpus for Indian Languages: Opensource Data Set for Paraphrase Creation, IGI, Source Title: Handbook of Research on Emerging Trends and Applications of Machine Learning. DOI: 10.4018/978-1-5225-9643-1.ch008</li> <li>Viswanathan S., Anand Kumar M., Soman K.P. (2019) A Comparative Analysis of Machine Comprehension Using Deep Learning Models in Code-Mixed Hindi Language. In Recent Advances in Computational Intelligence. Studies in Computational Intelligence, vol 823. Springer, Cham</li> </ul> </div> </div> </div> </div> <script> window.onscroll = function() { // Add a function to handle scroll events var topnav = document.getElementById("myTopnav"); if (window.pageYOffset > 0) { // Adjust the scroll position as needed topnav.classList.add("sticky"); } else { topnav.classList.remove("sticky"); } }; function myFunction() { var x = document.getElementById("myTopnav"); if (x.className === "topnav") { x.className += " responsive"; } else { x.className = "topnav"; } } </script></body>',
        'contact': '<h2>Contact Us</h2><p>Contact information and form.</p>'
    };

    // Load the content into the 'content' div
    var contentDiv = document.getElementById('content');
    if (contentMap.hasOwnProperty(page)) {
        contentDiv.innerHTML = contentMap[page];

        // Update the "active" class for the clicked link
        var navLinks = document.querySelectorAll(".topnav a");
        navLinks.forEach(function (link) {
            link.classList.remove("active");
        });
        var activeLink = document.querySelector(".topnav a[href='#" + page + "']");
        if (activeLink) {
            activeLink.classList.add("active");
        }
    } else {
        contentDiv.innerHTML = '<h2>Page not found</h2>';
    }
}

// Load the initial content (e.g., Home page) when the page loads
window.onload = function () {
    loadContent('home');
};
