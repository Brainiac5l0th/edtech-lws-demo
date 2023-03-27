import React from 'react'
import { VideosList } from '../../components/admin'

const Videos = () => {
    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-full px-5 lg:px-20">
                <div className="px-3 py-20 bg-opacity-10">
                    <div className="w-full flex">
                        <button className="btn ml-auto">Add Video</button>
                    </div>
                    <VideosList />
                </div>
            </div>
        </section>
    )
}

export default Videos