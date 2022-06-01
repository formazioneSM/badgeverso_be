const getTemplate = (title, text) => {
    return `<html>
    <head>
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>${title}!</title>
    <style>
  @media only screen and (max-width: 620px) {
    table[class=body] h1 {
      font-size: 28px !important;
      margin-bottom: 10px !important;
    }
  
    table[class=body] p,
  table[class=body] ul,
  table[class=body] ol,
  table[class=body] td,
  table[class=body] span,
  table[class=body] a {
      font-size: 16px !important;
    }
  
    table[class=body] .wrapper,
  table[class=body] .article {
      padding: 10px !important;
    }
  
    table[class=body] .content {
      padding: 0 !important;
    }
  
    table[class=body] .container {
      padding: 0 !important;
      width: 100% !important;
    }
  
    table[class=body] .main {
      border-left-width: 0 !important;
      border-radius: 0 !important;
      border-right-width: 0 !important;
    }
  
    table[class=body] .btn table {
      width: 100% !important;
    }
  
    table[class=body] .btn a {
      width: 100% !important;
    }
  
    table[class=body] .img-responsive {
      height: auto !important;
      max-width: 100% !important;
      width: auto !important;
    }
  }
  @media all {
    .ExternalClass {
      width: 100%;
    }
  
    .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
      line-height: 100%;
    }
  
    .apple-link a {
      color: inherit !important;
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      text-decoration: none !important;
    }
  
    /* .btn-primary table td:hover {
      background-color: #d5075d !important;
    } */
  
    /* .btn-primary a:hover {
      background-color: #d5075d !important;
      border-color: #d5075d !important;
    } */
  }
  </style></head>
    <body class style="background-color: #003594; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #003594; width: 100%;" width="100%" bgcolor="#003594">
        <tr>
          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
          <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top">
            
            <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
  
              <!-- START CENTERED WHITE CONTAINER -->
              <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">${title}!</span>
              <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
  
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                      <tr>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                          <div style="padding-top: 5px;">
                            <a href="https://sysmanagement.it/it/app-home/" style="color: #ec0867; text-decoration: none;">
                                      <img src="https://badge.sysmanagement.it/assets/logo-sm.png" width="200" alt="Logo" style="-ms-interpolation-mode: bicubic; width: 200px; max-width: 80%; height: auto; border: none; text-decoration: none; color: rgb(255, 255, 255);">
                                  </a>
                          </div>
  
                          <div style="margin: 3rem 0; text-align: center">
                            <img src="https://badge.sysmanagement.it/assets/hello.png" alt="Welcome" style="-ms-interpolation-mode: bicubic; width: 180px; max-width: 60%; height: auto; border: none; text-decoration: none;" width="180">
                          </div>
  
                          <tr>
                              <td style="padding: 1rem 0;">
                                  <h1 style="font-family: sans-serif; margin: 0; text-align: center; margin-top: 0; margin-bottom: 16px; font-size: 26px; line-height: 32px; font-weight: bold; letter-spacing: -0.02em; color: #003594;">
                                      ${title}.
                                      
                                      <!-- <span style="padding-left: 5px; vertical-align: middle"><img src="https://badge.sysmanagement.it/assets/badgeverso.png" alt="Badgeverso" style="-ms-interpolation-mode: bicubic; width: 180px; max-width: 50%; height: auto; border: none; text-decoration: none; padding-top: 5px;" width="180"></span> -->
  
                                  </h1>
                              </td>
                          </tr>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; box-sizing: border-box; width: 100%;" width="100%">
                            <tbody>
                              <tr>
                                <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;">
                                    <tbody>
                                      <tr>
                                        <p style="color: black!important; font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">${text}</p>
                                       
                                      </tr>
                                    </tbody>
                                  </table>
                                  </td><td style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                  </td>
                  <tr>
                    <td style="font-family: sans-serif; opacity: 0.25; vertical-align: top; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                      <img src="https://badge.sysmanagement.it/assets/logo-medium.png" alt="Think. Change. Grow." style="-ms-interpolation-mode: bicubic; width: 120px; max-width: 50%; height: auto; border: none; text-decoration: none; padding: 1rem 0;" width="120">
                    </td>
                  </tr>
                                </tr></tbody></table></td>
                              </tr>
                            
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div></td>
                </tr>
  
              <!-- END MAIN CONTENT AREA -->
              </table>
  
              <!-- START FOOTER -->
              <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%; font-size: 5px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                  <tr>
                    <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                      Copyright © 2022 SystemManagement S.p.a., All rights reserved.
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
  
            <!-- END CENTERED WHITE CONTAINER -->
            
          
          <td>&nbsp;</td>
        
      
    </body>
  </html>`
}

module.exports = getTemplate;