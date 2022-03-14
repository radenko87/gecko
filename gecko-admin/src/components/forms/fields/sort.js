
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Isvg from 'react-inlinesvg';


import Dropzone from 'react-dropzone';
import GridLayout from 'react-grid-layout';

import deleteIcon from '../../../assets/svg/delete.svg';
import image from '../../../assets/svg/image.svg';

class Sort extends Component {
    constructor(props) {
        super(props);
        this.dropzone = React.createRef()
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.state = {
            files: [],
            imagesLayout: [],
            _uploading: [],
        };
    }


    componentDidMount() {
        let files = [];
        let imagesLayout = [];
        for (let i = 0; i < this.props.value.length; i++) {
            files.push(this.props.value[i]);
            imagesLayout.push(i);
        }

        this.setState({
            files: files,
            imagesLayout: imagesLayout,
        });

    }



    componentDidUpdate(prevProps, prevState) {
        if ((!this.state.files.length && this.props.value.length) && !(prevState.files.length && !this.state.files.length)) {
            console.log(this.props.value);
            let files = [];
            let imagesLayout = [];
            for (let i = 0; i < this.props.value.length; i++) {
                files.push(this.props.value[i]);
                imagesLayout.push(i);
            }

            this.setState({
                files: files,
                imagesLayout: imagesLayout,
            });

        }

        if (prevState.files.length && !this.state.files.length) {
            console.log("TTTTTTTTTTTT");
            let files = [];
            for (let i = 0; i < this.state.imagesLayout.length; i++) {
                files.push(this.state.files[this.state.imagesLayout[i]]);
            }

            this.props.onChange(files);

        }
    }



    onLayoutChange(layout) {
        //console.log(layout);
        let arr = [];
        for (let i = 0; i < layout.length; i++) {
            arr.push({ idx: layout[i].i, position: layout[i].y * 1 + layout[i].x });
        }

        arr.sort(function (a, b) { return (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0); });
        let imagesLayout = [];
        for (let i = 0; i < arr.length; i++) {
            imagesLayout.push(parseInt(arr[i].idx));
        }


        this.setState({
            imagesLayout: imagesLayout
        }, () => {
            let files = [];
            for (let i = 0; i < this.state.imagesLayout.length; i++) {
                files.push(this.state.files[this.state.imagesLayout[i]]);
            }

            this.props.onChange(files);


        });

    }


    render() {

        let images = [];

        if (this.state.files) {
            let x = 0;
            let y = 0;
            for (let i = 0; i < this.state.files.length; i++) {
                let layout = { i: i.toString(), x: x, y: y, w: 1, h: 1 };
                let item = {
                    content: (
                        <div className="image" key={i.toString()} data-grid={layout}>

                            <div className="image-wrap">
                                <img src={this.state.files[i].image} />
                            </div>
                        </div>
                    )
                };
                images.push(item);
                x++;
                if (x >= 1) {
                    y++;
                    x = 0;
                }
            }



        }


        return (
            <div className="input-wrap">
                <label>{this.props.label}</label>
                <div className="file-drop sort-layout" ref={(ref) => this.dropzone = ref}>


                    <GridLayout
                        className="grid-layout "
                        onLayoutChange={this.onLayoutChange}
                        width={this.dropzone.offsetWidth}
                        rowHeight={146}

                        compactType={'vertical'}
                        isResizable={false}
                        verticalCompact={true}
                        horizontalCompact={true}
                        useCSSTransforms={true}
                        cols={1}
                    >

                        {
                            images.map((image, idx) => {
                                return (
                                    image.content
                                );
                            })
                        }
                    </GridLayout>


                </div>





            </div>
        );
    }
}

export default Sort;