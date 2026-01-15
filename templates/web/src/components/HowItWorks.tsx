// Step Icons
const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z" />
    </svg>
);

const CommandLineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
    </svg>
);

const RocketLaunchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
        <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
    </svg>
);

const steps = [
    {
        icon: <FolderIcon />,
        title: "Navigate to Your Project",
        description: "Open terminal in your project directory",
        code: "cd your-project",
    },
    {
        icon: <CommandLineIcon />,
        title: "Install with NPX",
        description: "Run the CLI to install .agent folder",
        code: "npx @vudovn/antigravity-kit init",
    },
    {
        icon: <RocketLaunchIcon />,
        title: "Start Using",
        description: "Skills auto-apply, invoke workflows with slash commands",
        code: "Your prompt",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="section relative overflow-hidden">
            {/* Background Glow */}
            <div className="bg-glow bg-glow-accent right-0 top-0 translate-x-1/2" />

            <div className="container-content relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="heading-lg mb-4">
                        Get Started in <span className="gradient-text">3 Steps</span>
                    </h2>
                    <p className="text-body max-w-2xl mx-auto">
                        Simple installation process to unlock powerful AI agent
                        capabilities in your project.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Step Number */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                            </div>

                            <div className="glass-card p-6 h-full">
                                {/* Icon */}
                                <div className="icon-wrapper mb-4">{step.icon}</div>

                                {/* Title */}
                                <h3 className="heading-md mb-2">{step.title}</h3>

                                {/* Description */}
                                <p className="text-body text-sm mb-4">{step.description}</p>

                                {/* Code Block */}
                                <div className="code-block">
                                    <code className="text-[var(--color-accent)]">{step.code}</code>
                                </div>
                            </div>

                            {/* Connector Line (not on last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-[var(--color-border)]" />
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
