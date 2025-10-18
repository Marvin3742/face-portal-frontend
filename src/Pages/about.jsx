import "../css/about.css"
import gan_arch from "../Images/vanilla_gan_arch.png"
import val_func from "../Images/gan_loss.png"
import style_gan_arch from "../Images/stylegan_arch.png"
import latent_gif from "../Images/latent_man.gif"
import optim_func from "../Images/optim_func.png"
import learning_func from "../Images/learning_func.png"
import { useEffect, useState } from "react"

function AboutDocs() {
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    const sections = document.querySelectorAll(".docs-section");
    const navLinks = document.querySelectorAll(".docs-sidebar a");

    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="about-docs-container">
      {/* Hero / Intro */}
      <section className="hero-section">
        <h1 className="main-title">About</h1>
        <p className="subtitle">Here's how Face Portal works</p>
      </section>

      {/* Docs Layout */}
      <div className="docs-layout">
        <aside className={`docs-sidebar ${menuOpen ? "open" : ""}`}>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰ Docs Menu
          </button>
          <nav>
            <ul onClick={() => setMenuOpen(true)}>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#gan-arch">GAN Architecture</a></li>
              <li><a href="#stylegan">StyleGAN</a></li>
              <li><a href="#latents">Latent Space Manipulation</a></li>
              <li><a href="#gan-inversion">GAN Inversion Problem</a></li>
              <li><a href="#limitations">Limitations</a></li>
              <li><a href="#future-work">Future Work</a></li>
              <li><a href="#references">References</a></li>
            </ul>
          </nav>
        </aside>


        {/* Docs Content */}
        <main className="docs-content">
          <section id="overview" className="docs-section">
            <h2>Overview</h2>
            <p>Hey there, welcome to Face Portal! I've had so much fun building this amazing website and learning so much along the way.
              Face Portal is an AI powered web application that lets users explore how their face might look as they age or how they might have looked in the past.
              It was built to showcase the incredible capabilites of Generative Adversarial Networks (GANs) and to explore the fascinating world of age progression
              technology. I was inspired to build this project after first learning about GANs and their unique ability to generate hyper-realistic images. My goal was to 
              build a free user-friendly web application that allows anyone to experiment with GAN technology without the need for expensive hardware or 
              technical expertise. This page is dedicated to documenting how the system works and the various components that make it all possible.
              I hope you enjoy learning about Face Portal as much as I enjoyed building it, cheers!
            </p>
          </section>

          <section id="gan-arch" className="docs-section">
            <h2>GAN Architecture</h2>
            <p>
              To understand Face Portal, you first need to understand the basics of Generative Adversarial Networks (GANs),
              which serve as the foundation for our age progression model. In its simplest form, a GAN consists of two neural
              networks: a <b>generator</b> and a <b>discriminator</b> [1]. The generator creates synthetic images, while the discriminator
              distinguishes between real and fake images. These networks are trained in a two-player minimax game, where
              the generator attempts to fool the discriminator, and the discriminator works to correctly identify real versus fake images.
              Over time, both networks improve until the generator produces images that are indistinguishable from real ones. This adversarial 
              process is what gives GANs their name and power.
            </p>

            <p>
              We can formalize this process with the value function shown in Figure 1.1. The first term in the equation takes the log of D(X) which represents
              the likelihood that x is from the data distribution rather than the generator distribution. Because x is from the data distribution, this term is
              essentially rewarding the discriminator for correctly identifying real samples as real. The second term takes the log likelihood of [1 - D(G(z))] which
              represents the likelihood that a fake sample is from the data distribution. Because G(z) is a fake sample, this term is essentially rewarding the discriminator
              for correctly identifying fake samples as fake. With this value function, we are ready to train our GAN via a minimax game where the generator tries to minimize this function
              while the discriminator tries to maximize it
            </p>

            <div className="diagram-container">
              <img src={val_func} alt="GAN Value Function" className="diagram-image" />
              <p className="diagram-caption">Figure 1.1 GAN Value Function</p>
            </div>

            <p>
              The objective of this game is to reach a Nash equilibrium where neither player can improve their outcome by changing their strategy.
              At equilibrium 3 things are true [1]:
              <br />1. <span className="math">P<sub>g</sub> = P<sub>data</sub></span> (the generator has learned the exact distribution of the real data.)
              <br />2. <span className="math">D(x) = 0.5</span> (the discriminator is guessing randomly since it can no longer distinguish between real and fake samples.)
              <br />3. <span className="math">V(G, D) = −log(4)</span> (global optimum - neither player can improve their outcome by changing their strategy.)
            </p>

            <div className="diagram-container">
              <img src={gan_arch} alt="GAN Architecture Diagram" className="diagram-image" />
              <p className="diagram-caption">Figure 1.2 Vanilla GAN Architecture Diagram</p>
            </div>
          </section>

          <section id="stylegan" className="docs-section">
            <h2>StyleGAN</h2>
            <p>
              StyleGAN [Figure 2.1] is an iteration of the ongoing research in developing models for the synthesis of high quality, realistic images. It was 
              first introduced in the paper "A Style-Based Generator Architecture for Generative Adversarial Networks" and was developed by researchers 
              at NVIDIA. StyleGAN builds upon the traditional GAN architecture by introducing a new generator architecture that disentangles high-level 
              features (like pose and identity) from low-level features (color and texture) allowing for more control over the generated images. The goal of
              disentanglement is a latent space that consists of linear subspaces where each subspace controls a specific attribute of the generated image[2].

              The key innovation of StyleGAN is the use of a mapping network that transforms a latent vector (z) into an intermediate latent space (w). While
              a traditional GAN maps z directly to the image space, StyleGAN first maps z to w via an 8-layer MLP which is then used to control the style of the 
              generated image at different levels of detail [2]. It is this intermediate disentangled latent space that makes StyleGAN particularly well suited for age progression tasks.
            </p>

            <div className="diagram-container">
              <img src={style_gan_arch} alt="StyleGAN Architecture Diagram" className="diagram-image" />
              <p className="diagram-caption">Figure 2.1 StyleGAN Architecture Diagram</p>
            </div>
          </section>

          <section id="latents" className="docs-section">
            <h2>Latent Space Manipulation</h2>
            <p>
              We now arrive at the core of how Face Portal works: <strong>latent space manipulation</strong>. The latent space is a high-dimensional space where each point corresponds to a unique image generated by the GAN.
              In StyleGAN, this space is represented by the intermediate latent space <em>W</em>, which provides a more disentangled representation of the data compared to the original latent space <em>Z</em>.
              This disentanglement allows us to manipulate specific attributes of the generated images by moving in certain directions within the latent space.
            </p>

            <p>
              One of the most influential works in this area is <strong>InterFaceGAN</strong>, which demonstrated that many human-interpretable facial attributes — such as age, gender, expression, and pose — correspond to roughly linear directions in the latent space.
              By training simple linear classifiers (e.g., SVMs) on labeled attribute data, InterFaceGAN identifies a hyperplane that separates latent codes with and without a given attribute.
              The normal vector to this hyperplane then defines the <em>direction</em> in latent space that controls that specific attribute [3].
            </p>

            <p>
              In Face Portal, we leverage this concept to perform controlled transformations of a user’s uploaded face.
              For instance, by projecting the image into the latent space and then shifting the latent code along the “age” direction learned by InterFaceGAN, the system can simulate a younger or older appearance while preserving identity and realism.
              This approach enables smooth, semantically meaningful edits, showing how latent space geometry can be harnessed for intuitive image manipulation.
            </p>

            <p>
              Mathematically, this can be expressed as:
              <br />
              <em>w′ = w + αn</em>,
              <br />
              where <em>w</em> is the original latent vector, <em>n</em> is the unit normal vector corresponding to the target attribute direction (e.g., “age”), and <em>α</em> controls the intensity of the modification.
              By adjusting <em>α</em>, users can interactively control how much an attribute (like age) changes in the generated image [3].
            </p>

            <img src={latent_gif} alt="Latent Manipulation GIF" />
            <p className="diagram-caption">Figure 3.1 Latent Space Manipulation Example</p>
          </section>

          <section id="gan-inversion" className="docs-section">
            <h2>GAN Inversion Problem</h2>
            <p>
              One of the key challenges in applying latent space manipulation to real images is the <strong>GAN inversion problem</strong>. 
              The reason is because a prerequisite for manipulating an image in StyleGAN's latent space is first being able to find its 
              corresponding latent code. This process, known as GAN inversion, involves mapping a real image back to the latent space of the GAN [4].
              In other words, when performing age progression/regression on a user image, what we're really doing is a three-step process:
            </p>

            <p>
              1. Invert the input image to find its latent representation <em>w</em>.
              <br />
              2. Manipulate <em>w</em> along the desired attribute direction (e.g., age) to obtain a new latent code <em>w′</em>.
              <br />
              3. Generate the modified image from <em>w′</em> using the StyleGAN generator.
            </p>

              <p>
              There are several approaches to GAN inversion, each with its own trade-offs between accuracy and computational efficiency. For FacePortal,
              the 2 main approaches I researched were optimization and encoder-based methods. 
              </p>

              <p>
              Optimization methods follow an intuitive approach: given a target image, they iteratively optimize a latent code to minimize the reconstruction error
              between the generated image and the target image by minimizing an objective function [Figure 4.1]. This sort of brute force approach can yield high-fidelity reconstructions
              but comes at the cost of speed, often requiring several minutes to invert a single image [4]. Because this process is done during inference, it was not ideal for
              a real-time web application like Face Portal.
              </p>

              <p>
              Encoder-based methods [Figure 4.2], on the other hand, train a neural network to directly predict the latent code from an input image. This approach is much faster at inference time,
              often taking just milliseconds to encode an image. However, it can struggle to achieve the same level of reconstruction fidelity as optimization methods [4]. 
              For FacePortal, I ultimately decided to integrate an encoder-based approach using <strong>Encoder4Editing (e4e)</strong>, a state-of-the-art encoder designed specifically for StyleGAN inversion and 
              semantic editing tasks [5]. The e4e model improves upon earlier encoders by learning to predict latent codes that not only reconstruct input images accurately, but also remain close to the manifold of 
              the GAN’s latent space — ensuring that subsequent edits (like age progression) produce natural, realistic results.
              </p>

            <div className="diagram-container">
              <img src={optim_func} alt="Optimization-based Inversion" className="diagram-image" />
              <p className="diagram-caption">Figure 4.1 Optimization-based Inversion</p>
              <img src={learning_func} alt="Learning-based Inversion" className="diagram-image" />
              <p className="diagram-caption">Figure 4.2 Learning-based Inversion</p>
            </div>

          </section>

          <section id="limitations" className="docs-section">
            <h2>Limitations</h2>
            <p>
              While Face Portal demonstrates the impressive capabilities of GANs for age progression, there are several limitations to be aware of.
              First, the quality of the generated images can vary significantly based on the input photo. Images with extreme poses, occlusions (e.g., glasses, hats), or poor lighting conditions may not invert well into the latent space,
              leading to artifacts or unrealistic results after manipulation. For best results, users should upload clear, front-facing photos with minimal obstructions.
            </p>

            <p>
              Second, while latent space manipulation allows for smooth transitions in attributes like age, it is not perfect. The learned directions may not capture all nuances of aging,
              such as changes in skin texture or hair color. As a result, some generated images may appear less realistic or fail to fully convey the intended age transformation. Additionally,
              while StyleGAN's W space is more disentangled than Z space, there can still be some entanglement between attributes, leading to unintended changes for example, altering age may also add glasses
              or change facial expressions in some cases.
            </p>

            <p>
              Third, GANs are known to sometimes produce biased outputs based on their training data. If the training dataset lacks diversity, the model may struggle to generate realistic images for underrepresented groups [2]. This is an important consideration for any application involving human faces.
              Lastly, the GAN inversion process itself is not flawless. Even with advanced encoders like e4e, there can be discrepancies between the original image and its reconstructed version,
              which may affect the quality of subsequent edits. Ongoing research continues to improve inversion techniques, but it remains a challenging problem in the field of generative modeling.
            </p>
          </section>

          <section id="future-work" className="docs-section">
            <h2>Future Work</h2>
            <p>
              Looking ahead, there are several exciting directions for future work to enhance FacePortal and similar applications. One area of focus is improving the GAN inversion process.
              While encoder-based methods like e4e offer speed, there is still room to improve reconstruction fidelity. Hybrid approaches that combine optimization with learned encoders could yield better results.
              Additionally, exploring newer architectures beyond StyleGAN, such as StyleGAN2 or other emerging models, may provide further improvements in image quality and attribute control.
            </p>
            
            <p>
              Another avenue for future work is expanding the range of editable attributes beyond age. While age progression is a compelling use case, the same latent space manipulation techniques can be applied to other
              attributes like gender, expression, or even more complex transformations like changing hairstyles or adding accessories. Developing intuitive interfaces that allow users to control multiple attributes simultaneously would enhance the user experience.
            </p>
            
            <p>
              Finally, future work could also focus on addressing some edge cases not mentioned in the limitations section. For a good laugh, take a picture of yourself sideways
              and see how the model ages you. The results are hilarious! Overall, while Face Portal showcases the impressive capabilities of GANs for age progression, there is still 
              much to explore and improve in this rapidly evolving field.
            </p>
          </section>

          <section id="references" className="docs-section">
            <h2>References</h2>
            <p>
              [1] <a href="https://arxiv.org/abs/1406.2661" target="_blank" rel="noopener noreferrer" >I. Goodfellow et al., "Generative Adversarial Networks," arXiv, 2014. doi:10.48550/arXiv.1406.2661.</a>
              <br />
              [2] <a href="https://arxiv.org/abs/1812.04948" target="_blank" rel="noopener noreferrer" >T. Karras, S. Laine, and T. Aila, "A Style-Based Generator Architecture for Generative Adversarial Networks," arXiv preprint arXiv:1812.04948, 2019. doi: 10.48550/arXiv.1812.04948.</a>
              <br />
              [3] <a href="https://arxiv.org/abs/2005.09635" target="_blank" rel="noopener noreferrer" >Y. Shen, C. Yang, X. Tang, and B. Zhou, "InterFaceGAN: Interpreting the Disentangled Face Representation Learned by GANs," arXiv preprint arXiv:2005.09635, 2020.</a>
              <br />
              [4] <a href="https://doi.org/10.1109/TPAMI.2022.3181070" target="_blank" rel="noopener noreferrer" >W. Xia, Y. Zhang, Y. Yang, J.-H. Xue, B. Zhou, and M.-H. Yang, "GAN Inversion: A Survey," IEEE Transactions on Pattern Analysis and Machine Intelligence, vol. 45, no. 3, pp. 3121–3138, 2022. doi: 10.1109/TPAMI.2022.3181070.</a>
              <br />
              [5] <a href="https://doi.org/10.1145/3450626.3459838" target="_blank" rel="noopener noreferrer" >O. Tov, Y. Alaluf, Y. Nitzan, O. Patashnik, and D. Cohen-Or, "Designing an Encoder for StyleGAN Image Manipulation," ACM Transactions on Graphics, vol. 40, no. 4, pp. 1-14, Jul. 2021. doi: 10.1145/3450626.3459838.</a>
            </p>
          </section>

        </main>
      </div>
    </div>
  )
}

export default AboutDocs
