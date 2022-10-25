import React, { useState } from 'react';
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import './gallery.css'
export default function Gallery() {
  const navigate = useNavigate()
  const [img , setImg] = useState(true)
  const data = require("../../data/data.json")
  const location = useLocation()
  const path = location.pathname.split("/")[2]
  //(path)
  let filters = data.filter(e=>path == e.id)
  //(filters)
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);

  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  const updateState =(m,n)=>{
    data.map(e => {
      //(e.id,parseInt(m))
      if(e.id===parseInt(m))
      {
        e.original=n.imageBase64
        e.thumbnail=n.imageBase64
      
      }
    })
    //(data)
    navigate("/")
  }

  return (
    <div>
      {
        img === true ?
        <>
          <p>Click <strong className='txt' onClick={()=>{
            setImg(false)
            openImgEditor()}}>Me</strong> button and you can edit the image.</p>
          <ImageGallery items={filters} />
        </> :""
      }
      {isImgEditorShown && (
        <FilerobotImageEditor
          source={filters[0].original}
          onSave={(editedImageObject, designState) =>{
            //('saved', editedImageObject, designState)
            updateState(path , editedImageObject)}
          }
          onClose={()=> navigate("/")}
          annotationsCommon={{
            fill: '#ff0000',
          }}
          Text={{ text: 'Check my task' }}
          Rotate={{ angle: 90, componentType: 'slider' }}
          Crop={{
            presetsItems: [
              {
                titleKey: 'classicTv',
                descriptionKey: '4:3',
                ratio: 4 / 3,
              },
              {
                titleKey: 'cinemascope',
                descriptionKey: '21:9',
                ratio: 21 / 9,
              },
            ],
            presetsFolders: [
              {
                titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                groups: [
                  {
                    titleKey: 'facebook',
                    items: [
                      {
                        titleKey: 'profile',
                        width: 180,
                        height: 180,
                        descriptionKey: 'fbProfileSize',
                      },
                      {
                        titleKey: 'coverPhoto',
                        width: 820,
                        height: 312,
                        descriptionKey: 'fbCoverPhotoSize',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          defaultToolId={TOOLS.TEXT} // or 'Text'
        />
      )}
    </div>
  );
}