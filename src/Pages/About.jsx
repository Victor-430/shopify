import { Linkedin, Github, Twitter } from "lucide-react";

export const About = () => {
  return (
    <footer className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg p-6 ">
      <div className="max-w-2xl my-10 mx-auto text-center">
        <div className="mb-4 font-kumbh">
          <p className="text-gray-800">
            Coded by:
            <span className="font-semibold text-black">vencedorZest</span>
          </p>
          <p className="text-gray-600 px-1">
            Challenge by:
            <a
              href="https://www.frontendmentor.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline"
            >
              Frontend Mentor
            </a>
          </p>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/victor-430"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-gray-900 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6 " />
          </a>
          <a
            href="https://www.linkedin.com/in/victor-oyeleke-169827215"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-gray-900 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/vencedorZest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-gray-900 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};
