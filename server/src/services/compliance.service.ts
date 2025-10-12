import Compliance from "../models";

export class ComplianceService {
  async checkProject(projectId: number, projectParams: any): Promise<any> {
    // Real compliance check logic based on project parameters
    const rules = [
      { name: "Balandlik cheklovi", weight: 25, check: (params: any) => this.checkHeight(params) },
      { name: "Yong'in xavfsizligi", weight: 25, check: (params: any) => this.checkFireSafety(params) },
      { name: "Ekologik talablar", weight: 25, check: (params: any) => this.checkEnvironmental(params) },
      { name: "Sanitariya normalari", weight: 25, check: (params: any) => this.checkSanitary(params) },
    ];

    const results = [];
    let totalScore = 0;

    for (const rule of rules) {
      const { score, status } = rule.check(projectParams);

      results.push({
        ruleName: rule.name,
        status,
        score,
        details: this.generateDetails(rule.name, projectParams),
      });

      totalScore += score * (rule.weight / 100);
    }

    // Save results to database
    await Compliance.Compliance.bulkCreate(
      results.map((result) => ({
        projectId: projectId,
        ruleName: result.ruleName,
        status: result.status as "passed" | "failed" | "pending",
        score: result.score,
        details: result.details,
      }))
    );

    return {
      projectId,
      overallScore: Math.round(totalScore),
      status:
        totalScore > 70 ? "passed" : totalScore > 40 ? "warning" : "failed",
      results,
    };
  }

  private checkHeight(params: any): { score: number; status: string } {
    const height = parseFloat(params.height) || 0;
    const type = params.type || 'residential';

    // Different height limits based on building type
    const heightLimits = {
      residential: 12,
      commercial: 20,
      industrial: 15
    };

    const maxHeight = heightLimits[type as keyof typeof heightLimits] || 12;

    if (height <= maxHeight) {
      return { score: 100, status: "passed" };
    } else if (height <= maxHeight * 1.1) {
      return { score: 85, status: "warning" };
    } else if (height <= maxHeight * 1.25) {
      return { score: 60, status: "warning" };
    } else {
      return { score: 20, status: "failed" };
    }
  }

  private checkFireSafety(params: any): { score: number; status: string } {
    const floors = parseInt(params.floors) || 1;
    const area = parseFloat(params.area) || 0;
    const type = params.type || 'residential';

    let score = 100;

    // Fire safety requirements based on floors
    if (floors > 5) {
      score -= 30; // High-rise buildings need extensive fire safety
    } else if (floors > 3) {
      score -= 15; // Multi-story buildings need good fire safety
    }

    // Area considerations
    if (area > 2000) {
      score -= 10; // Larger buildings need more fire exits
    }

    // Building type considerations
    if (type === 'industrial') {
      score -= 5; // Industrial buildings have higher fire risk
    }

    if (score >= 80) {
      return { score, status: "passed" };
    } else if (score >= 60) {
      return { score, status: "warning" };
    } else {
      return { score, status: "failed" };
    }
  }

  private checkEnvironmental(params: any): { score: number; status: string } {
    const area = parseFloat(params.area) || 0;
    const type = params.type || 'residential';

    let score = 100;

    // Environmental impact based on area and type
    if (area > 5000) {
      score -= 25; // Large buildings have significant environmental impact
    } else if (area > 2000) {
      score -= 15;
    } else if (area > 1000) {
      score -= 5;
    }

    // Building type environmental considerations
    if (type === 'industrial') {
      score -= 20; // Industrial buildings typically have higher environmental impact
    } else if (type === 'commercial') {
      score -= 10; // Commercial buildings have moderate impact
    }

    if (score >= 80) {
      return { score, status: "passed" };
    } else if (score >= 60) {
      return { score, status: "warning" };
    } else {
      return { score, status: "failed" };
    }
  }

  private checkSanitary(params: any): { score: number; status: string } {
    const floors = parseInt(params.floors) || 1;
    const area = parseFloat(params.area) || 0;
    const type = params.type || 'residential';

    let score = 95; // Sanitary norms are generally well-defined

    // Considerations for sanitary requirements
    if (floors > 10) {
      score -= 10; // High-rise buildings need complex sanitary systems
    }

    if (area > 3000) {
      score -= 5; // Larger buildings need more sanitary facilities
    }

    if (type === 'industrial') {
      score -= 5; // Industrial buildings may have different sanitary requirements
    }

    if (score >= 85) {
      return { score, status: "passed" };
    } else {
      return { score, status: "warning" };
    }
  }

  private generateDetails(ruleName: string, projectParams: any): string {
    const height = parseFloat(projectParams.height) || 0;
    const floors = parseInt(projectParams.floors) || 1;
    const area = parseFloat(projectParams.area) || 0;
    const type = projectParams.type || 'residential';

    switch (ruleName) {
      case "Balandlik cheklovi":
        const heightLimits = { residential: 12, commercial: 20, industrial: 15 };
        const maxHeight = heightLimits[type as keyof typeof heightLimits] || 12;
        if (height <= maxHeight) {
          return `Balandlik ${height}m - ${type} binolar uchun ruxsat etilgan (${maxHeight}m) ichida.`;
        } else {
          return `Balandlik ${height}m - ruxsat etilgan (${maxHeight}m) dan oshib ketgan. Ruxsatnoma talab qilinadi.`;
        }

      case "Yong'in xavfsizligi":
        let fireDetails = `Bino ${floors} qavatli, maydoni ${area}m².`;
        if (floors > 5) {
          fireDetails += ' Yuqori ko\'p qavatli bino - kengaytirilgan yong\'in xavfsizlik tizimi talab qilinadi.';
        } else if (floors > 3) {
          fireDetails += ' Ko\'p qavatli bino - yong\'in xavfsizlik choralari tekshirilishi kerak.';
        } else {
          fireDetails += ' Yong\'in xavfsizlik talablari bajarilgan.';
        }
        return fireDetails;

      case "Ekologik talablar":
        let envDetails = `Maydon ${area}m² ${type} bino.`;
        if (area > 5000) {
          envDetails += ' Katta maydon - batafsil ekologik ta\'sir baholash talab qilinadi.';
        } else if (area > 2000) {
          envDetails += ' O\'rta maydon - ekologik ta\'sir baholash tavsiya etiladi.';
        } else {
          envDetails += ' Ekologik talablar bajarilgan.';
        }
        if (type === 'industrial') {
          envDetails += ' Sanoat binosi - maxsus ekologik ruxsatnoma kerak.';
        }
        return envDetails;

      case "Sanitariya normalari":
        let sanitaryDetails = `Bino ${floors} qavatli.`;
        if (floors > 10) {
          sanitaryDetails += ' Yuqori bino - murakkab sanitariya tizimlari talab qilinadi.';
        } else {
          sanitaryDetails += ' Asosiy sanitariya talablari bajarilgan.';
        }
        return sanitaryDetails;

      default:
        return "Qo'shimcha tekshiruv talab qilinadi";
    }
  }

  async getComplianceByProjectId(projectId: number): Promise<any> {
    const complianceRecords = await Compliance.Compliance.findAll({
      where: { projectId },
      order: [["createdAt", "DESC"]],
    });

    return complianceRecords.map((record) => record.toJSON());
  }
}

