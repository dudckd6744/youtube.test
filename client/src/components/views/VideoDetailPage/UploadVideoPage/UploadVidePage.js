import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone'
import Axios from 'axios';
import {useSelector} from 'react-redux';

const {TextArea} = Input;
const {Title} = Typography;

const PrivateOption = [
    {value:0 , label:"Private"},
    {value:1 , label:"Public"}
]
const CategoryOption = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"}
]

function UploadVideoPage(props) {
    const user = useSelector(state => state.user)
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [Filepath, setFilepath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")


    const onTitleChange = (e)=> {
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange =(e)=>{
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange =(e)=>{
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange=(e)=>{
        setCategory(e.currentTarget.value)
    }

    const onDrop=(files)=>{
        var formData = new FormData();
        var config = {
            header : {'content-type' : 'multipart/from-data'}
        }
        formData.append("file",files[0])
        console.log(files)

        Axios.post('/api/video/uploadfiles', formData,config)
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                
                var variable ={
                    url: response.data.url,
                    filename: response.data.filename
                }

                setFilepath(response.data.url)

                Axios.post('/api/video/thumbnail', variable)
                .then(response =>{
                    if(response.data.success){
                        console.log(response.data)
                        setDuration(response.data.fileDuration)
                        setThumbnailPath(response.data.url)
                    }else{
                        alert('thumbnail false!!!')
                    }
                })
            }else{
                alert("file upload false!")
            }
        })

    }

    const onSubmit =(e)=>{
        e.preventDefault()

        var variable = {
            writer:user.userData._id,
            title:VideoTitle,
            description: Description,
            privacy:Private,
            filePath:Filepath,
            category:Category,
            duration:Duration,
            thumbnail:ThumbnailPath
        }

        Axios.post('api/video/uploadVideo', variable)
        .then(response=> {
            if(response.data.success){
                message.success("video upload success!!")
                setTimeout(() => {
                    props.history.push('/')
                }, 3000);
            }else{
                message.warn("video upload false!!")
            }
        })

    }

    return (
        <div style ={{ maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{ display:'flex', justifyContent:'space-between'}}>
                    {/* drop znoe */}
                    <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={100000000}
                    >
                    {({getRootProps, getInputProps})=> (
                        <div style={{ width:'300px', height:'240px', border:'1px solid lightgray',
                        display:'flex', alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type ="plus" style ={{ fontSize:'2rem'}} />
                        </div>
                    )}
                    </Dropzone>

                    {/* thumbnail */}
                {ThumbnailPath &&  
                    <div>
                        <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                    </div>
                }      

                </div>
                <br />
                <br />
                <label>Title</label>
                <Input 
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea 
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />
                <select onChange ={onPrivateChange}>
                    {PrivateOption.map((item, index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <select onChange={onCategoryChange}>
                {CategoryOption.map((item, index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
                ))}
                </select>
                <br />
                <br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UploadVideoPage
