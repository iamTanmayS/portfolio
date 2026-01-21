import { AlbumIntro } from './album/AlbumIntro';
import { DomeGallery } from '../components/ui/DomeGallery';
import { albumPhotos } from '../data/album';

export function Album() {
  // Convert album photos to the format expected by DomeGallery
  const galleryImages = albumPhotos.map(photo => ({
    src: photo.url,
    alt: photo.caption || photo.alt
  }));

  return (
    <section
      id="album"
      data-section="album"
      style={{
        position: 'relative',
        width: '100vw',
        overflow: 'hidden',
        background: '#0a0a0f',
      }}
    >
      {/* 1. Intro Panel */}
      <AlbumIntro />

      {/* 2. 3D Dome Gallery */}
      <div
        style={{
          width: '100vw',
          height: '100vh',
          marginLeft: 'calc(-50vw + 50%)',
        }}
      >
        <DomeGallery
          images={galleryImages}
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={5}
          segments={34}
          dragDampening={2}
          overlayBlurColor="#0a0a0f"
          imageBorderRadius="16px"
          openedImageBorderRadius="16px"
          openedImageWidth="500px"
          openedImageHeight="500px"
          grayscale={false}
        />
      </div>
    </section>
  );
}
