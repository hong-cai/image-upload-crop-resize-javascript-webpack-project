import 'jquery';
import 'bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Cropper from 'cropperjs';

        const resetBton = document.getElementById('resetBton');
        const clearBton = document.getElementById('clearBton');
        const rotateBton = document.getElementById('rotateBton');
        const moveLeftBton = document.getElementById('moveLeftBton');
        const moveRightBton = document.getElementById('moveRightBton');
        const moveUpBton = document.getElementById('moveUpBton');
        const moveDownBton = document.getElementById('moveDownBton');
        const upload = document.getElementById('upload');
        const imageContainer = document.getElementById('image');
        const image = document.querySelector('#image img');
        const initialImageURL = image.src;
        const result = document.getElementById('result');
        const saveImage = document.getElementById('save_image');
        let croppedImage = document.querySelector('.swal2-image') ? document.querySelector('.swal2-image').src : '';


        let data = {
            cropper: null,
            cropped: null,
            canvasData: null,
            cropBoxData: null,
            croppedData: null,
            imageElement: null,
            saveImageElement: null,
            faceURL: null
        };




        // /Upload/Change Image
        if (upload) {
            upload.addEventListener('change', (e) => {
                let targetVal = e.target.value;
                let regex = new RegExp("(.*?)\.(jpg|jpeg|png|gif|bmp)$", 'i');
                //Make sure file selected
                if (e.target.files[0]) {
                    //Make sure it's an image format
                    if (!regex.exec(targetVal)) {
                        targetVal = "";
                        Swal.fire('File format is not supported! Compatible file extensions: jpg, jpeg, png, gif, bmp');
                    } else {
                        //Turn the original image url now the crop-face image url:
                        let reader = new FileReader();
                        reader.onload = function(e) {
                            image.onload = function() {
                                
                                data.faceURL = initialImageURL;
                                //Change the original image to new uploaded image
                                initCropper(image);
                            }
                            image.setAttribute('src', this.result);
                        };
                        reader.readAsDataURL(e.target.files[0]);

                    }
                    //if e.target.files[0] undefined
                } else {
                    image.setAttribute('src', '');
                }

            });
        }



        // function update(dataParam) {
        //     Object.assign(data, dataParam);
        // }

        function initState() {
            if (data.cropper) {
                data.cropper.destroy();
                data.cropper = null;
            }
        }

        function crop() {
            data.croppedData = data.cropper.getData();
            data.canvasData = data.cropper.getCanvasData();
            data.cropBoxData = data.cropper.getCropBoxData();
            initState();
        }


        //Cropping preparation process  
        function initCropper(image) {
            initState();
            data.cropper = new Cropper(image, {
                toggleDragModeOnDblclick: false,
                guides: false,
                dragMode: 'move',
                autoCropArea: 100,
                aspectRatio: 1,
                cropBoxMovable: false,
                responsive: false,
                cropBoxResizable: false,
                background: false,
                ready: () => {
                    if (data.croppedData) {
                        data.cropper.crop().setData(data.croppedData).setCanvasData(data.canvasData).setCropBoxData(data.cropBoxData);
                        data.croppedData = null;
                        data.canvasData = null;
                        data.cropBoxData = null;
                    }

                    let containerData = data.cropper.crop().getContainerData();

                    data.cropper.crop().setCropBoxData({
                        left: 0,
                        top: 0,
                        width: containerData.width,
                        height: containerData.width,
                    });
                    $('.cropper-container').height(containerData.width);

                    let face = $('.cropper-face')[0];
                    face.style.background = `url(${data.faceURL}) no-repeat center`;
                    face.style.backgroundSize = `cover`;
                    face.style.opacity = 1;

                    data.cropper.crop().setCropBoxData({
                        left: 0,
                        top: 0,
                    });
                    $('.cropper-crop-box').height(containerData.width);
                    $('.cropper-crop-box').width(containerData.width);
                    let trackelement = imageContainer;
                },
            });

        }




        function cropImages() {
            // Cropping Process
            let canvas = document.createElement('canvas');
            //The image size to be cropped
            let croppedCanvas = data.cropper.getCroppedCanvas({
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            });
            let context = canvas.getContext('2d');
            let cropper = data.cropper;
            let cropperFace = document.querySelector('.cropper-face');

            //set the cropped image size the same as the crop-box size
            canvas.width = cropperFace.clientWidth;
            canvas.height = cropperFace.clientHeight;
            let editedImage;
            //Mask: the image as the photoframe outside
            let mask = new Image();
            mask.src = data.faceURL;
            if (data.faceURL) {
                mask.onload = function() {
                    let image = new Image();
                    //The image inside the photoframe
                    image.src = croppedCanvas.toDataURL();
                    image.onload = function() {

                        //This part of code is for adding filter to cropped image:
                        //Extra Trick: manipulate the pixels inside the image data to get grey channel effect
                        // var imgPixels = context.getImageData(0, 0, canvas.width, canvas.height);
                        // for (var y = 0; y < canvas.height; y++) {
                        //     for (var x = 0; x < canvas.width; x++) {
                        //         var i = (y * 4) * canvas.width + x * 4;
                        //         var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                        //         imgPixels.data[i] = avg;
                        //         imgPixels.data[i + 1] = avg;
                        //         imgPixels.data[i + 2] = avg;
                        //     }
                        // }
                        //putImageData: draw image 
                        context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, canvas.width, canvas.height);

                        let calcFace = calculateFaceWidthAndHeight(cropperFace,
                            mask);
                        context.drawImage(mask, calcFace.finalWidthOffset,
                            calcFace.finalHeightOffset, calcFace.sWidth, calcFace.sHeight, 0,
                            0, canvas.width, canvas.height);
                        editedImage = canvas.toDataURL();
                        Swal.fire({
                            title: "Save image?",
                            imageUrl: editedImage,
                            imageHeight: 200,
                            imageWidth: 200,
                            imageAlt: 'Cropped image',
                            confirmButtonText: `Save`,
                            showCloseButton: true,
                            showCancelButton: true,
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                if (downloadBase64File(editedImage, 'download')) {
                                    Swal.fire('Success!Downloading...', '', 'success')
                                } else {
                                    Swal.fire('Something please try again.', '', 'info')
                                }
                            }
                        });
                    };
                };
            };
        };




        // calculate size
        function calculateFaceWidthAndHeight(containerEl, imageEl) {
            let imgWidth = imageEl.naturalWidth;
            let imgHeight = imageEl.naturalHeight;

            let containerWidth = containerEl.getBoundingClientRect().width;
            let containerHeight = containerEl.getBoundingClientRect().height;

            let imgRatio = (imgHeight / imgWidth);
            let containerRatio = (containerHeight / containerWidth);

            let result = {
                finalHeight: '',
                finalWidth: '',
                imgRatio: imgRatio,
                containerRatio: containerRatio,
            };

            if (containerRatio > imgRatio) {
                result.finalHeight = containerHeight;
                result.finalWidth = (containerHeight / imgRatio);
                result.finalWidthOffset = ((result.finalWidth - containerWidth) / 2) *
                    (imgWidth / result.finalWidth);
                result.finalHeightOffset = 0;
                result.sWidth = imgWidth - (result.finalWidthOffset * 2);
                result.sHeight = imgHeight;
            } else {
                result.finalWidth = containerWidth;
                result.finalHeight = (containerWidth / imgRatio);
                result.finalWidthOffset = 0;
                result.finalHeightOffset = ((result.finalHeight - containerHeight) /
                    2) * (imgHeight / result.finalHeight);
                result.sWidth = imgWidth;
                result.sHeight = imgHeight - (result.finalHeightOffset * 2);
            }
            return result;
        }





        // Buttons' events
        //Keep image, reset position
        resetBton.addEventListener('click', () => {
            if (data.cropper) {
                data.cropper.reset();
            }
        });

        clearBton.addEventListener('click', () => {
            // clear image keep the frame
            if (!data.cropper) {
                console.log('no crpper');
            } else {
                initState();
                image.src = initialImageURL;
            }
        });

        rotateBton.addEventListener('click', () => {
            if (data.cropper) {
                data.cropper.rotate(90);
            }
        });
        moveLeftBton.addEventListener('click', () => {
            if (data.cropper) {
                data.cropper.move(-5, 0);
            }
        });
        moveRightBton.addEventListener('click', () => {
            if (data.cropper) {
                data.cropper.move(5, 0);
            }
        });
        moveUpBton.addEventListener('click', () => {
            if (data.cropper) {
                data.cropper.move(0, -5);
            }
        });
        moveDownBton.addEventListener('click', () => {
            if (data.cropper) {
                data.cropper.move(0, 5);
            }
        });

        saveImage.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (data.cropper) {
                cropImages();
            }
        })

        /***
         * Parameters:
         * base64Data: Actual base64 data
         * fileName:File name of the file which will be downloaded. 
         * 
         */

        function downloadBase64File(base64Data, fileName) {
            const linkSource = `${base64Data}`;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
            return true;
        }