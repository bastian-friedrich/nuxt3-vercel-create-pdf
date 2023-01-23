import pdf from 'pdf-creator-node';

export default defineEventHandler(async () => {
    const html = await useStorage().getItem('assets:server:template.html');

    const options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Test-Page</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };

    const users = [
        {
          name: "Shyam",
          age: "26",
        },
        {
          name: "Navjot",
          age: "26",
        },
        {
          name: "Vitthal",
          age: "26",
        },
      ];

      const document = {
        html: html,
        data: {
          users: users,
        },
        type: "buffer",
      };

      return await pdf.create(document, options);
})
