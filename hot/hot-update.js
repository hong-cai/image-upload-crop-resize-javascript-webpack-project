/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateimage_upload_crop_resize_javascript_webpack_project"]("main",{

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ \"./node_modules/bootstrap/dist/js/bootstrap.js\");\n/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2/dist/sweetalert2.js */ \"./node_modules/sweetalert2/dist/sweetalert2.js\");\n/* harmony import */ var sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cropperjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cropperjs */ \"./node_modules/cropperjs/dist/cropper.js\");\n/* harmony import */ var cropperjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cropperjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvar resetBton = document.getElementById('resetBton');\nvar clearBton = document.getElementById('clearBton');\nvar rotateBton = document.getElementById('rotateBton');\nvar moveLeftBton = document.getElementById('moveLeftBton');\nvar moveRightBton = document.getElementById('moveRightBton');\nvar moveUpBton = document.getElementById('moveUpBton');\nvar moveDownBton = document.getElementById('moveDownBton');\nvar upload = document.getElementById('upload');\nvar imageContainer = document.getElementById('image');\nvar image = document.querySelector('#image img');\nvar initialImageURL = image.src;\nvar result = document.getElementById('result');\nvar saveImage = document.getElementById('save_image');\nvar croppedImage = document.querySelector('.swal2-image') ? document.querySelector('.swal2-image').src : '';\nvar data = {\n  cropper: null,\n  cropped: null,\n  canvasData: null,\n  cropBoxData: null,\n  croppedData: null,\n  imageElement: null,\n  saveImageElement: null,\n  faceURL: null\n}; // /Upload/Change Image\n\nif (upload) {\n  upload.addEventListener('change', function (e) {\n    var targetVal = e.target.value;\n    var regex = new RegExp(\"(.*?)\\.(jpg|jpeg|png|gif|bmp)$\", 'i'); //Make sure file selected\n\n    if (e.target.files[0]) {\n      //Make sure it's an image format\n      if (!regex.exec(targetVal)) {\n        targetVal = \"\";\n        sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2___default().fire('File format is not supported! Compatible file extensions: jpg, jpeg, png, gif, bmp');\n      } else {\n        //Turn the original image url now the crop-face image url:\n        var reader = new FileReader();\n\n        reader.onload = function (e) {\n          image.onload = function () {\n            data.faceURL = initialImageURL; //Change the original image to new uploaded image\n\n            initCropper(image);\n          };\n\n          image.setAttribute('src', this.result);\n        };\n\n        reader.readAsDataURL(e.target.files[0]);\n      } //if e.target.files[0] undefined\n\n    } else {\n      image.setAttribute('src', '');\n    }\n  });\n} // function update(dataParam) {\n//     Object.assign(data, dataParam);\n// }\n\n\nfunction initState() {\n  if (data.cropper) {\n    data.cropper.destroy();\n    data.cropper = null;\n  }\n}\n\nfunction crop() {\n  data.croppedData = data.cropper.getData();\n  data.canvasData = data.cropper.getCanvasData();\n  data.cropBoxData = data.cropper.getCropBoxData();\n  initState();\n} //Cropping preparation process  \n\n\nfunction initCropper(image) {\n  initState();\n  data.cropper = new (cropperjs__WEBPACK_IMPORTED_MODULE_3___default())(image, {\n    toggleDragModeOnDblclick: false,\n    guides: false,\n    dragMode: 'move',\n    autoCropArea: 100,\n    aspectRatio: 1,\n    cropBoxMovable: false,\n    responsive: false,\n    cropBoxResizable: false,\n    background: false,\n    ready: function ready() {\n      if (data.croppedData) {\n        data.cropper.crop().setData(data.croppedData).setCanvasData(data.canvasData).setCropBoxData(data.cropBoxData);\n        data.croppedData = null;\n        data.canvasData = null;\n        data.cropBoxData = null;\n      }\n\n      var containerData = data.cropper.crop().getContainerData();\n      data.cropper.crop().setCropBoxData({\n        left: 0,\n        top: 0,\n        width: containerData.width,\n        height: containerData.width\n      });\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cropper-container').height(containerData.width);\n      var face = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cropper-face')[0];\n      face.style.background = \"url(\".concat(data.faceURL, \") no-repeat center\");\n      face.style.backgroundSize = \"cover\";\n      face.style.opacity = 1;\n      data.cropper.crop().setCropBoxData({\n        left: 0,\n        top: 0\n      });\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cropper-crop-box').height(containerData.width);\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.cropper-crop-box').width(containerData.width);\n      var trackelement = imageContainer;\n    }\n  });\n}\n\nfunction cropImages() {\n  // Cropping Process\n  var canvas = document.createElement('canvas'); //The image size to be cropped\n\n  var croppedCanvas = data.cropper.getCroppedCanvas({\n    imageSmoothingEnabled: true,\n    imageSmoothingQuality: 'high'\n  });\n  var context = canvas.getContext('2d');\n  var cropper = data.cropper;\n  var cropperFace = document.querySelector('.cropper-face'); //set the cropped image size the same as the crop-box size\n\n  canvas.width = cropperFace.clientWidth;\n  canvas.height = cropperFace.clientHeight;\n  var editedImage; //Mask: the image as the photoframe outside\n\n  var mask = new Image();\n  mask.src = data.faceURL;\n\n  if (data.faceURL) {\n    mask.onload = function () {\n      var image = new Image(); //The image inside the photoframe\n\n      image.src = croppedCanvas.toDataURL();\n\n      image.onload = function () {\n        //This part of code is for adding filter to cropped image:\n        //Extra Trick: manipulate the pixels inside the image data to get grey channel effect\n        // var imgPixels = context.getImageData(0, 0, canvas.width, canvas.height);\n        // for (var y = 0; y < canvas.height; y++) {\n        //     for (var x = 0; x < canvas.width; x++) {\n        //         var i = (y * 4) * canvas.width + x * 4;\n        //         var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;\n        //         imgPixels.data[i] = avg;\n        //         imgPixels.data[i + 1] = avg;\n        //         imgPixels.data[i + 2] = avg;\n        //     }\n        // }\n        //putImageData: draw image \n        context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, canvas.width, canvas.height);\n        var calcFace = calculateFaceWidthAndHeight(cropperFace, mask);\n        context.drawImage(mask, calcFace.finalWidthOffset, calcFace.finalHeightOffset, calcFace.sWidth, calcFace.sHeight, 0, 0, canvas.width, canvas.height);\n        editedImage = canvas.toDataURL();\n        sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2___default().fire({\n          title: \"Save image?\",\n          imageUrl: editedImage,\n          imageHeight: 200,\n          imageWidth: 200,\n          imageAlt: 'Cropped image',\n          confirmButtonText: \"Save\",\n          showCloseButton: true,\n          showCancelButton: true\n        }).then(function (result) {\n          /* Read more about isConfirmed, isDenied below */\n          if (result.isConfirmed) {\n            if (downloadBase64File(editedImage, 'download')) {\n              sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2___default().fire('Success!Downloading...', '', 'success');\n            } else {\n              sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2___default().fire('Something please try again.', '', 'info');\n            }\n          }\n        });\n      };\n    };\n  }\n\n  ;\n}\n\n; // calculate size\n\nfunction calculateFaceWidthAndHeight(containerEl, imageEl) {\n  var imgWidth = imageEl.naturalWidth;\n  var imgHeight = imageEl.naturalHeight;\n  var containerWidth = containerEl.getBoundingClientRect().width;\n  var containerHeight = containerEl.getBoundingClientRect().height;\n  var imgRatio = imgHeight / imgWidth;\n  var containerRatio = containerHeight / containerWidth;\n  var result = {\n    finalHeight: '',\n    finalWidth: '',\n    imgRatio: imgRatio,\n    containerRatio: containerRatio\n  };\n\n  if (containerRatio > imgRatio) {\n    result.finalHeight = containerHeight;\n    result.finalWidth = containerHeight / imgRatio;\n    result.finalWidthOffset = (result.finalWidth - containerWidth) / 2 * (imgWidth / result.finalWidth);\n    result.finalHeightOffset = 0;\n    result.sWidth = imgWidth - result.finalWidthOffset * 2;\n    result.sHeight = imgHeight;\n  } else {\n    result.finalWidth = containerWidth;\n    result.finalHeight = containerWidth / imgRatio;\n    result.finalWidthOffset = 0;\n    result.finalHeightOffset = (result.finalHeight - containerHeight) / 2 * (imgHeight / result.finalHeight);\n    result.sWidth = imgWidth;\n    result.sHeight = imgHeight - result.finalHeightOffset * 2;\n  }\n\n  return result;\n} // Buttons' events\n//Keep image, reset position\n\n\nresetBton.addEventListener('click', function () {\n  if (data.cropper) {\n    data.cropper.reset();\n  }\n});\nclearBton.addEventListener('click', function () {\n  // clear image keep the frame\n  if (!data.cropper) {\n    console.log('no crpper');\n  } else {\n    initState();\n    image.src = initialImageURL;\n  }\n});\nrotateBton.addEventListener('click', function () {\n  if (data.cropper) {\n    data.cropper.rotate(90);\n  }\n});\nmoveLeftBton.addEventListener('click', function () {\n  if (data.cropper) {\n    data.cropper.move(-5, 0);\n  }\n});\nmoveRightBton.addEventListener('click', function () {\n  if (data.cropper) {\n    data.cropper.move(5, 0);\n  }\n});\nmoveUpBton.addEventListener('click', function () {\n  if (data.cropper) {\n    data.cropper.move(0, -5);\n  }\n});\nmoveDownBton.addEventListener('click', function () {\n  if (data.cropper) {\n    data.cropper.move(0, 5);\n  }\n});\nsaveImage.addEventListener('click', function (ev) {\n  ev.preventDefault();\n\n  if (data.cropper) {\n    cropImages();\n  }\n});\n/***\r\n * Parameters:\r\n * base64Data: Actual base64 data\r\n * fileName:File name of the file which will be downloaded. \r\n * \r\n */\n\nfunction downloadBase64File(base64Data, fileName) {\n  var linkSource = \"\".concat(base64Data);\n  var downloadLink = document.createElement(\"a\");\n  downloadLink.href = linkSource;\n  downloadLink.download = fileName;\n  downloadLink.click();\n  return true;\n}\n\n//# sourceURL=webpack://image-upload-crop-resize-javascript-webpack-project/./src/javascript/index.js?");

/***/ })

});