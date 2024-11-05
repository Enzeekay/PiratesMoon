// const SURVEY_ID = 1;

const surveyJson = {
    elements: [{
        name: "Your Name",
        title: "Tên Khách Hàng:",
        type: "text"
    }, {
        type: "text",
        name: "phoneNumber",
        title: "Số Điện Thoại Liên Hệ:",
        isRequired: true,
      }, {
        name: "product",
        title: "Loại Sản Phẩm:",
        type: "radiogroup",
        choices: [
            "Pirates*Moon Artificial Intelligence - 700ml - 250.000 VNĐ"
        ],
        defaultValue: "Pirates*Moon Artificial Intelligence - 700ml - 250.000 VNĐ",

    }, {
        type: "dropdown",
        name: "quantity",
        title: "Số Lượng:",
        isRequired: true,
        defaultValue: 1,
        choices: Array.from({ length: 18 }, (_, i) => (i + 1).toString())
      }, {
        type: "text",
        name: "email",
        title: "Email Liên Hệ:",
        inputType: "email",
        validators: [
          {
            type: "email",
            text: "Địa chỉ email dùng để nhận thông tin đơn hàng."
          }
        ]
      },{
        type: "text",
        name: "street",
        title: "Địa Chỉ Nhận Hàng:",
        isRequired: true
      },
      {
        type: "text",
        name: "city",
        title: "Tỉnh/Thành Phố:",
        isRequired: true
    }, {
        type: "comment",
        name: "note",
        title: "Ghi Chú:",
        placeHolder: "Thông tin ghi chú cho người giao hàng."
      }, ]
};

const survey = new Survey.Model(surveyJson);


function sendDataToServer(survey) {
    //send Ajax request to your web server.
    console.log("The results are:" + JSON.stringify(survey.data));
    $.ajax({
    url: 'https://prod-03.southeastasia.logic.azure.com:443/workflows/21e42630b73249f591eb2cf9e61c1073/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YOSZPuXbUbc_6ysC4tEHLdnVCnfRgH0V1JImbxZErFk',
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) { console.log(data.msg);},
    data: JSON.stringify(survey.data)
    });
};


survey.onComplete.add(sendDataToServer);

document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
});

