const modalTamplate = {
     myWebWorks: `
     <div class="content">
       <h1 data-projecttitle></h1>
       <div class="level-item has-text-centered">
       <figure class="image" data-projectIMG>
<img src="https://bulma.io/images/placeholders/128x128.png" / >
</figure>
</div>
       <div data-projectDescription></div>
       <h2>Technology Stack</h2>
       <div data-technologyDescription></div>
       <div data-technologyList></div>
       <h3>Description of the creation process</h3>
       <div data-creationDescription></div>
       <br />
         <div class='columns' data-projectdone></div>
       <h4>Links</h4>
       <div data-links></div>
     </div>

     `,
   mySkilz: `<div class='content'>
     <h1 data-projecttitle></h1>
     <div data-projectDescription></div>
     <div data-maincontent>
     <br />
     <div class='table-container'>
     <table class="table">
  <thead>
    <tr>
      <th><abbr>Skill</abbr></th>
      <th><abbr>Сompetence Precentage</abbr></th>
      <th><abbr>Coment</abbr></th>
    </tr>
  </thead>
  <tbody data-tablecontent>
  </tbody>
  </table>
  </div>
   </div>
        </div>
`,
emptyModal: `<div class='content'>
  <h1 data-projecttitle></h1>
   <div data-header></div>
     <div data-maincontent>
       <br />

     </div>
       <div data-secondmsg></div>
  </div>
`



};




const contentMyExper = {
      guitTeacher: {
           modalTitle: 'Web Project',
           projectName: 'Guitar Teacher',
           pictSRC: 'img/projects/note_project.png',
           projectDescription: '<stong>Static aplication</strong> - for learning notes on the guitar fretboard. Studying gammas and visualizing them on a standard & non-standard neck.',
           technologyDescription:'I chose SVG graphics technology to implement this idea. The control of the graphical interface occurs through the library <strong> D3 </strong> .',
           technologyList: ['D3 framework','Jquery framework','SVG Technology','Bootstrap framework'],
           creationDescription:`First I drew the interface in illustrator and then transferred to html code, wrote interface control using d3 library. In implementing this project, I explored the possibilities of svg graphics, the possibility of
           libraries for web interfaces. <blockquote>In 2017, it seemed to me that the possibility of developing this idea through SVG was very interesting and quickly implemented.</blockquote>
            In the near future I plan to add a description of the help section and the elimination of bugs.
                      `,
           links: {
             github: 'https://github.com/andrewburw/Guitar-note-teacher',
             projectSite: 'https://andrewburw.github.io/Guitar-note-teacher'
           },
           progress: 90

      },
      tankApp: {
           modalTitle: 'Web Project',
           projectName: 'Tank App',
           pictSRC: 'img/projects/tank_app.png',
           projectDescription: '<strong>Full Stack</strong> apllication -  Tank App is comunity of low-prices.Do not refuel at the highest price! Use the map to find the best gas station prices near you. .',
           technologyDescription:'I chose this development environment (M.E.R.N) as my main area of development as a developer. For more effective training, it was necessary to develop a more complex application.',
           technologyList: ['NodeJS','MongoDB','Express','ReactJS','Bootstrap framework','Liflet js','A lot of dependencies'],
           creationDescription:`In implementing this project, I explored a lot of new interesting information as developer. <blockquote>What I liked in this project: from a white sheet and ideas to a really working service.</blockquote>

                      `,
           links: {
             github: 'none',
             projectSite: 'none'
           },
           progress: 80

      },
      workHours: {
           modalTitle: 'Web Project',
           projectName: 'Employe Work Hours',
           pictSRC: 'img/projects/timing_project.png',
           projectDescription: '<strong>Fullstack project</strong> - a really working project from my last work. The goal of the project is to view the set hours of work with the ability to watch the archive of months.',
           technologyDescription:'I chose from the available development tools.',
           technologyList: ['PHP','Jquery framework','PostGress(SQL)','Bootstrap framework'],
           creationDescription:`Task: display hours of work with PostGress db in a web environment. Backend - a simple API on php  (get the data from the database by SQL query).
           Frontend - jqery + bootstrap.One of the difficulties was to write api in php without experience in this language.
           <blockquote>What I liked in this project: receive positive feedback from employees about a well-functioning application.</blockquote>

                      `,
           links: {
             github: 'none',
             projectSite: 'none'
           },
           progress: 99

      },
      patterns: {
           modalTitle: 'Web Project',
           projectName: 'Patterns',
           pictSRC: 'img/projects/patterns.png',
           projectDescription: '<strong>JS Static Visualization</strong> - just visualization.',
           technologyDescription:'The goal of the project is to understand how the Jquery works. To write my own library on Vannila JS.',
           technologyList: ['Vannila JS'],
           creationDescription:`Task: display pattern by "Vannila JS".
           <blockquote>Memory leak consumption of large resources.</blockquote>
            In next version is idea to revrite pattren to "canvas". `,
           links: {
             github: 'none',
             projectSite: 'none'
           },
           progress: 99

      },

      thisSite: {
           modalTitle: 'Web Project',
           projectName: 'Portfolio Site',
           pictSRC: 'img/projects/this_site.png',
           projectDescription: '<strong>Portfolio Static Site</strong> - This site is about me and my achievements.',
           technologyDescription:'The goal of the project is write a site on bulma framework; create a modular system of modals; use only vanilla js.',
           technologyList: ['Vannila JS','Bulma','ab_lib.js'],
           creationDescription:`Task: use only "Vannila JS" and do not use Bootstrap or JQuery.
            `,
           links: {
             github: 'none',
             projectSite: 'none'
           },
           progress: 99

      },
      riverApp: {
           modalTitle: 'Web Project',
           projectName: 'River App',
           pictSRC: 'img/projects/river_app.png',
           projectDescription: 'Information Will Follow',
           technologyDescription:'Information Will Follow',
           technologyList: ['NodeJS','MongoDB','Express','ReactJS','Material UI','Liflet.js'],
           creationDescription:`Information Will Follow`,
           links: {
             github: 'none',
             projectSite: 'none'
           },
           progress: 5

      }

};
const contentMySkilzz = {
  mySkilzz: {
      modalTitle: 'My Skillz',
      projectName: 'My Skillz Description',
      projectDescription: 'TESTLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque',
      skilzData: {
        JavaScript: {
          precentage: 60,
          description: 'My main programming language.',
          color: 'is-warning'
        },

        Html: {
          precentage: 80,
          description: '',
          color: 'is-danger'
        },
        Css: {
          precentage: 50,
          description: '',
          color: 'is-info'
        },
        MongoDB: {
          precentage: 10,
          description: 'My main DB.Need more practice.',
          color: 'is-primary'
        },
        mongooseJS: {
          precentage: 10,
          description: 'My main DB.Need more practice.',
          color: 'is-primary'
        },
        NodeJS: {
          precentage: 10,
          description: 'My main programming backend language.Need more practice.',
          color: 'is-success'
        },
        ReactJS: {
          precentage: 60,
          description: 'My favorite UI framework.',
          color: 'is-info'
        },
        Git: {
          precentage: 10,
          description: 'Need more practice to work in team and large projects.',
          color: 'is-black'
        },
        FrameWorks: {
          precentage: 80,
          description: '<strong>Bootstrap</strong>, <strong>Bulma</strong>, <strong>Jquery</strong>, <strong>D3</strong> and more...'
        },
        Excel: {
          precentage: 80,
          description: '7 years of use of the Excel environment + experience in developing VBA applications(with PostGress DB).',
          color: 'is-success'
        },

        VisualBasic: {
          precentage: 99,
          description: ''
        },
        PostGress: {
          precentage: 20,
          description: 'Creating tables, linking tables through pgadmin.'
        },
        LibreBase: {
          precentage: 65,
          description: 'Application development in "Libre Base" interaction with postgres.'
        },

        Sql: {
          precentage: 20,
          description: 'Small application in the Libra Base',
          color: 'is-link'
        }
        ,
        PowerBi: {
          precentage: 50,
          description: 'Creating a sql and exel database reports.'
        },
        AdobeIllustrator: {
          precentage: 20,
          description: 'Small graphic illustrations.'
        }
      }

  }


}
const warnContent = {
       warnCv:{
         modalTitle: 'Warning!',
         modalHeader: '<h3>Sorry Download CV not Available!</h3>',
         modalContent: `<p>Sorry, because of the protection of personal data, you can get <strong> CV </strong> by
         request through an email or through a form on the site.</p>`,
         modalSecondContent: 'Write me by <a href="mailto:andrejsburackovs@gmail.com">Email</a> (andrejsburackovs@gmail.com) or <a onclick="writeMsg()">Form</a>.'


       },
       sendMessage:{
         modalTitle: 'Message form',
         modalHeader: '<p class="title is-4">Message.</p><p>Write me a massage by this form:</p><br />',
         modalContent: `<form><div class="field">
                                    <label class="label" for="emailField">Email:</label>
                                        <div class="control">
                                          <input class="input is-info" id="emailField" type="email" placeholder="Enter your email" required/>
                                           <p id="emailValidErrormsg" class="help is-danger hidden">This email is invalid</p>
                                       </div>
                        </div>
                        <div class="field">
                            <label class="label" for="messageFeild">Your text:</label>
                               <div class="control">
                                    <textarea  id="messageFeild" class="textarea is-info" placeholder="Enter your text" required minlength="10" maxlength="255"></textarea>
                                        <p id="textValidErrormsg" class="help is-danger hidden">Too short/long message!</p>
  </div>
</div> <button type="submit" id="sendMessageForm" class="button is-link" >Send message</button></form><br />`,
         modalSecondContent: ''


       }



}
