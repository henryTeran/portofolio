import VisualFlow from '../projects/visuals/VisualFlow';

export default function ArchitectureDiagram({ layers, label }: { layers: string[]; label: string }) {
  return <VisualFlow steps={layers} label={label} />;
}
